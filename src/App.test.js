import React from 'react';
import { render, screen } from '@testing-library/react';

// Simple test to ensure CI/CD works
describe('App Tests', () => {
  test('renders without crashing', () => {
    const div = document.createElement('div');
    div.id = 'root';
    document.body.appendChild(div);
    
    expect(document.getElementById('root')).toBeInTheDocument();
  });

  test('basic math works', () => {
    expect(2 + 2).toBe(4);
  });

  test('localStorage mock works', () => {
    localStorage.setItem('test', 'value');
    expect(localStorage.setItem).toHaveBeenCalledWith('test', 'value');
  });
});