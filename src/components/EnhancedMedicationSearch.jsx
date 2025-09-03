import React, { useState, useEffect, useCallback } from 'react';
import { MedicationMatcher } from '../utils/medicationMatcher';
import { medicationDatabase } from '../data/medications';
import './EnhancedMedicationSearch.css';

const EnhancedMedicationSearch = ({ 
  onMedicationSelect, 
  placeholder = "Type medication name (supports typos, Hebrew, brand names)...",
  maxSuggestions = 8,
  allowCustomEntry = true,
  showConfidence = true,
  autoFocus = false
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [isOpen, setIsOpen] = useState(false);
  const [recentSearches, setRecentSearches] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  // Debounced search function
  const performSearch = useCallback((query) => {
    if (!query || query.length < 2) {
      setSuggestions([]);
      setIsOpen(false);
      return;
    }

    setIsSearching(true);
    
    // Use MedicationMatcher for fuzzy search with typo tolerance
    const searchResults = MedicationMatcher.searchMedications(
      query, 
      medicationDatabase, 
      maxSuggestions
    );

    // Also get quick suggestions for autocomplete
    const quickSuggestions = MedicationMatcher.getSuggestions(
      query,
      medicationDatabase,
      5
    );

    // Combine and deduplicate results
    const combinedResults = [];
    const seen = new Set();

    // Add search results first (better matches)
    searchResults.forEach(result => {
      if (!seen.has(result.medication.id)) {
        combinedResults.push({
          ...result.medication,
          matchScore: result.score,
          matchType: result.matchType,
          confidence: result.confidence,
          matchReason: getMatchReason(result.matchType, query)
        });
        seen.add(result.medication.id);
      }
    });

    // Add quick suggestions if not already in results
    quickSuggestions.forEach(suggestion => {
      if (!seen.has(suggestion.medication.id)) {
        combinedResults.push({
          ...suggestion.medication,
          matchScore: suggestion.score,
          matchType: 'suggestion',
          confidence: 'medium',
          matchReason: 'Suggested based on partial match'
        });
        seen.add(suggestion.medication.id);
      }
    });

    // If no results but allow custom entry, add option to use typed text
    if (combinedResults.length === 0 && allowCustomEntry) {
      combinedResults.push({
        id: 'custom',
        name: query,
        brand: 'Custom Entry',
        isCustom: true,
        matchScore: 0.5,
        confidence: 'low',
        matchReason: 'No matches found - use as typed'
      });
    }

    setSuggestions(combinedResults);
    setIsOpen(combinedResults.length > 0);
    setIsSearching(false);
  }, [medicationDatabase, maxSuggestions, allowCustomEntry]);

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      performSearch(searchQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery, performSearch]);

  const getMatchReason = (matchType, query) => {
    switch(matchType) {
      case 'name_exact':
        return 'Exact match by generic name';
      case 'hebrew_exact':
        return 'Exact match by Hebrew name';
      case 'brand_exact':
        return 'Exact match by brand name';
      case 'name_fuzzy':
        return `Similar to generic name (typo tolerance)`;
      case 'brand_fuzzy':
        return `Similar to brand name (typo tolerance)`;
      case 'hebrew_fuzzy':
        return 'Similar to Hebrew name';
      case 'israeli_brand_fuzzy':
        return 'Similar to Israeli brand';
      case 'variation_match':
        return 'Known variation or common misspelling';
      default:
        return 'Partial match';
    }
  };

  const getConfidenceColor = (confidence) => {
    switch(confidence) {
      case 'high':
        return '#28a745';
      case 'medium':
        return '#ffc107';
      case 'low':
        return '#dc3545';
      default:
        return '#6c757d';
    }
  };

  const handleSelect = (medication) => {
    if (!medication.isCustom) {
      // Add to recent searches
      const updated = [medication, ...recentSearches.filter(m => m.id !== medication.id)].slice(0, 5);
      setRecentSearches(updated);
      localStorage.setItem('recentMedSearches', JSON.stringify(updated));
    }

    setSearchQuery(medication.isCustom ? medication.name : `${medication.name} (${medication.brand || medication.israeliBrand || ''})`);
    setSuggestions([]);
    setIsOpen(false);
    
    if (onMedicationSelect) {
      onMedicationSelect(medication);
    }
  };

  const handleKeyDown = (e) => {
    if (!isOpen || suggestions.length === 0) return;

    switch(e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < suggestions.length - 1 ? prev + 1 : 0
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev > 0 ? prev - 1 : suggestions.length - 1
        );
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && selectedIndex < suggestions.length) {
          handleSelect(suggestions[selectedIndex]);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        setSelectedIndex(-1);
        break;
    }
  };

  // Load recent searches on mount
  useEffect(() => {
    const saved = localStorage.getItem('recentMedSearches');
    if (saved) {
      try {
        setRecentSearches(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to load recent searches');
      }
    }
  }, []);

  return (
    <div className="enhanced-medication-search">
      <div className="search-input-container">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => {
            if (suggestions.length > 0) setIsOpen(true);
          }}
          placeholder={placeholder}
          autoFocus={autoFocus}
          className="medication-search-input"
          aria-label="Medication search"
          aria-autocomplete="list"
          aria-expanded={isOpen}
        />
        
        {isSearching && (
          <div className="search-spinner">🔍</div>
        )}

        {searchQuery && (
          <button 
            className="clear-search"
            onClick={() => {
              setSearchQuery('');
              setSuggestions([]);
              setIsOpen(false);
            }}
            aria-label="Clear search"
          >
            ✕
          </button>
        )}
      </div>

      {isOpen && suggestions.length > 0 && (
        <div className="medication-suggestions">
          {suggestions.map((med, index) => (
            <div
              key={med.id}
              className={`suggestion-item ${selectedIndex === index ? 'selected' : ''} ${med.isCustom ? 'custom-entry' : ''}`}
              onClick={() => handleSelect(med)}
              onMouseEnter={() => setSelectedIndex(index)}
            >
              <div className="suggestion-main">
                <span className="med-name">{med.name}</span>
                {med.brand && !med.isCustom && (
                  <span className="med-brand">({med.brand})</span>
                )}
                {med.heName && (
                  <span className="med-hebrew">{med.heName}</span>
                )}
              </div>
              
              {showConfidence && !med.isCustom && (
                <div className="suggestion-meta">
                  <span 
                    className="confidence-badge"
                    style={{ color: getConfidenceColor(med.confidence) }}
                  >
                    {med.confidence === 'high' ? '✓✓' : med.confidence === 'medium' ? '✓' : '?'}
                  </span>
                  <span className="match-reason">{med.matchReason}</span>
                </div>
              )}

              {med.category && !med.isCustom && (
                <div className="med-category">{med.category}</div>
              )}
            </div>
          ))}
        </div>
      )}

      {!searchQuery && recentSearches.length > 0 && (
        <div className="recent-searches">
          <div className="recent-header">Recent Searches:</div>
          <div className="recent-items">
            {recentSearches.map(med => (
              <button
                key={med.id}
                className="recent-item"
                onClick={() => handleSelect(med)}
              >
                {med.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default EnhancedMedicationSearch;