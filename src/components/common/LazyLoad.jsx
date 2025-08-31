// Lazy Loading Component with React.lazy and Suspense
import React, { Suspense, lazy, useState, useEffect } from 'react';
import ErrorBoundary from './ErrorBoundary';

// Loading spinner component
const LoadingSpinner = ({ message = 'Loading...' }) => (
  <div style={{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '40px',
    minHeight: '200px'
  }}>
    <div style={{
      width: '50px',
      height: '50px',
      border: '4px solid #f3f3f3',
      borderTop: '4px solid #667eea',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite'
    }} />
    <p style={{ marginTop: '20px', color: '#666' }}>{message}</p>
    <style>{`
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `}</style>
  </div>
);

// Lazy load wrapper component
export const LazyLoad = ({ 
  component, 
  fallback = <LoadingSpinner />,
  errorFallback,
  delay = 0,
  ...props 
}) => {
  const [showComponent, setShowComponent] = useState(!delay);

  useEffect(() => {
    if (delay) {
      const timer = setTimeout(() => setShowComponent(true), delay);
      return () => clearTimeout(timer);
    }
  }, [delay]);

  if (!showComponent) {
    return fallback;
  }

  const LazyComponent = typeof component === 'function' ? component : lazy(component);

  return (
    <ErrorBoundary fallback={errorFallback}>
      <Suspense fallback={fallback}>
        <LazyComponent {...props} />
      </Suspense>
    </ErrorBoundary>
  );
};

// Intersection Observer based lazy loading
export const LazyLoadOnScroll = ({ 
  children, 
  threshold = 0.1, 
  rootMargin = '50px',
  placeholder = <div style={{ minHeight: '100px' }} />
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [ref, setRef] = useState(null);

  useEffect(() => {
    if (!ref) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(ref);

    return () => observer.disconnect();
  }, [ref, threshold, rootMargin]);

  return (
    <div ref={setRef}>
      {isVisible ? children : placeholder}
    </div>
  );
};

// Lazy load images
export const LazyImage = ({ 
  src, 
  alt, 
  placeholder = '/placeholder.png',
  className,
  style,
  onLoad,
  onError
}) => {
  const [imageSrc, setImageSrc] = useState(placeholder);
  const [imageRef, setImageRef] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!imageRef) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Create new image to preload
          const img = new Image();
          
          img.onload = () => {
            setImageSrc(src);
            setLoading(false);
            if (onLoad) onLoad();
          };
          
          img.onerror = () => {
            setError(true);
            setLoading(false);
            if (onError) onError();
          };
          
          img.src = src;
          observer.disconnect();
        }
      },
      { threshold: 0.01, rootMargin: '50px' }
    );

    observer.observe(imageRef);

    return () => observer.disconnect();
  }, [imageRef, src, onLoad, onError]);

  return (
    <div 
      ref={setImageRef}
      className={className}
      style={{
        position: 'relative',
        ...style
      }}
    >
      <img
        src={imageSrc}
        alt={alt}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          filter: loading ? 'blur(5px)' : 'none',
          transition: 'filter 0.3s'
        }}
      />
      {loading && (
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)'
        }}>
          <LoadingSpinner message="" />
        </div>
      )}
      {error && (
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
          color: '#999'
        }}>
          <p>Failed to load image</p>
        </div>
      )}
    </div>
  );
};

// Code splitting for routes
export const lazyRoutes = {
  BoardQuestions: lazy(() => import('../BoardQuestions')),
  ClinicalTools: lazy(() => import('../ClinicalTools')),
  AIPoweredTools: lazy(() => import('../AIPoweredTools')),
  MedOptimizer: lazy(() => import('../AITools/MedOptimizer')),
  ClinicalNoteAnalyzer: lazy(() => import('../ClinicalNoteAnalyzer')),
  Day1Survival: lazy(() => import('../Day1Survival')),
  EnhancedMedicationSearch: lazy(() => import('../EnhancedMedicationSearch')),
  HazzardsRapidReview: lazy(() => import('../HazzardsRapidReview'))
};

// Preload component on hover/focus
export const PreloadableLink = ({ 
  to, 
  component, 
  children, 
  preloadDelay = 200,
  ...props 
}) => {
  let preloadTimer;

  const handlePreload = () => {
    preloadTimer = setTimeout(() => {
      if (typeof component === 'function') {
        component();
      }
    }, preloadDelay);
  };

  const handleCancelPreload = () => {
    clearTimeout(preloadTimer);
  };

  return (
    <a
      href={to}
      onMouseEnter={handlePreload}
      onFocus={handlePreload}
      onMouseLeave={handleCancelPreload}
      onBlur={handleCancelPreload}
      {...props}
    >
      {children}
    </a>
  );
};

// Lazy load with retry logic
export const LazyLoadWithRetry = ({ 
  importFunc, 
  maxRetries = 3,
  retryDelay = 1000,
  ...props 
}) => {
  const [Component, setComponent] = useState(null);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    let mounted = true;

    const loadComponent = async () => {
      try {
        const module = await importFunc();
        if (mounted) {
          setComponent(() => module.default || module);
        }
      } catch (err) {
        if (mounted) {
          if (retryCount < maxRetries) {
            setTimeout(() => {
              setRetryCount(prev => prev + 1);
            }, retryDelay * Math.pow(2, retryCount)); // Exponential backoff
          } else {
            setError(err);
          }
        }
      }
    };

    loadComponent();

    return () => {
      mounted = false;
    };
  }, [importFunc, retryCount, maxRetries, retryDelay]);

  if (error) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <p>Failed to load component after {maxRetries} attempts</p>
        <button onClick={() => setRetryCount(0)}>Retry</button>
      </div>
    );
  }

  if (!Component) {
    return <LoadingSpinner />;
  }

  return <Component {...props} />;
};

export default LazyLoad;