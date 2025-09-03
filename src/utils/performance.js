// Performance Optimization Utilities

// Debounce function for search inputs
export function debounce(func, delay = 300) {
  let timeoutId;
  
  return function debounced(...args) {
    const context = this;
    
    // Clear previous timeout
    clearTimeout(timeoutId);
    
    // Set new timeout
    timeoutId = setTimeout(() => {
      func.apply(context, args);
    }, delay);
    
    // Return a cancel function
    debounced.cancel = () => {
      clearTimeout(timeoutId);
    };
  };
}

// Throttle function for scroll/resize events
export function throttle(func, limit = 100) {
  let inThrottle;
  let lastFunc;
  let lastRan;
  
  return function throttled(...args) {
    const context = this;
    
    if (!inThrottle) {
      func.apply(context, args);
      lastRan = Date.now();
      inThrottle = true;
    } else {
      clearTimeout(lastFunc);
      lastFunc = setTimeout(() => {
        if ((Date.now() - lastRan) >= limit) {
          func.apply(context, args);
          lastRan = Date.now();
        }
      }, Math.max(limit - (Date.now() - lastRan), 0));
    }
  };
}

// Memoization for expensive calculations
export function memoize(fn, getKey) {
  const cache = new Map();
  
  return function memoized(...args) {
    const key = getKey ? getKey(...args) : JSON.stringify(args);
    
    if (cache.has(key)) {
      return cache.get(key);
    }
    
    const result = fn.apply(this, args);
    cache.set(key, result);
    
    // Limit cache size to prevent memory leaks
    if (cache.size > 100) {
      const firstKey = cache.keys().next().value;
      cache.delete(firstKey);
    }
    
    return result;
  };
}

// Lazy load images with Intersection Observer
export function lazyLoadImages(selector = 'img[data-lazy]') {
  if ('IntersectionObserver' in window) {
    const images = document.querySelectorAll(selector);
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.lazy;
          img.removeAttribute('data-lazy');
          imageObserver.unobserve(img);
        }
      });
    }, {
      rootMargin: '50px'
    });
    
    images.forEach(img => imageObserver.observe(img));
  } else {
    // Fallback for older browsers
    const images = document.querySelectorAll(selector);
    images.forEach(img => {
      img.src = img.dataset.lazy;
    });
  }
}

// Virtual scrolling for large lists
export class VirtualScroller {
  constructor(container, items, itemHeight, renderItem) {
    this.container = container;
    this.items = items;
    this.itemHeight = itemHeight;
    this.renderItem = renderItem;
    
    this.visibleStart = 0;
    this.visibleEnd = 0;
    
    this.init();
  }
  
  init() {
    // Create wrapper elements
    this.scrollContainer = document.createElement('div');
    this.scrollContainer.style.overflowY = 'auto';
    this.scrollContainer.style.height = '100%';
    
    this.contentContainer = document.createElement('div');
    this.contentContainer.style.position = 'relative';
    this.contentContainer.style.height = `${this.items.length * this.itemHeight}px`;
    
    this.visibleContainer = document.createElement('div');
    this.visibleContainer.style.position = 'absolute';
    this.visibleContainer.style.top = '0';
    this.visibleContainer.style.left = '0';
    this.visibleContainer.style.right = '0';
    
    this.contentContainer.appendChild(this.visibleContainer);
    this.scrollContainer.appendChild(this.contentContainer);
    this.container.appendChild(this.scrollContainer);
    
    // Set up event listeners
    this.scrollContainer.addEventListener('scroll', throttle(() => this.handleScroll(), 16));
    
    // Initial render
    this.handleScroll();
  }
  
  handleScroll() {
    const scrollTop = this.scrollContainer.scrollTop;
    const containerHeight = this.scrollContainer.clientHeight;
    
    this.visibleStart = Math.floor(scrollTop / this.itemHeight);
    this.visibleEnd = Math.ceil((scrollTop + containerHeight) / this.itemHeight);
    
    // Add buffer for smoother scrolling
    this.visibleStart = Math.max(0, this.visibleStart - 5);
    this.visibleEnd = Math.min(this.items.length, this.visibleEnd + 5);
    
    this.render();
  }
  
  render() {
    const fragment = document.createDocumentFragment();
    
    for (let i = this.visibleStart; i < this.visibleEnd; i++) {
      const item = this.items[i];
      const element = this.renderItem(item, i);
      element.style.position = 'absolute';
      element.style.top = `${i * this.itemHeight}px`;
      element.style.left = '0';
      element.style.right = '0';
      fragment.appendChild(element);
    }
    
    this.visibleContainer.innerHTML = '';
    this.visibleContainer.appendChild(fragment);
  }
  
  update(items) {
    this.items = items;
    this.contentContainer.style.height = `${this.items.length * this.itemHeight}px`;
    this.handleScroll();
  }
}

// Request idle callback polyfill
export const requestIdleCallback = window.requestIdleCallback || 
  function(callback) {
    const start = Date.now();
    return setTimeout(() => {
      callback({
        didTimeout: false,
        timeRemaining: () => Math.max(0, 50 - (Date.now() - start))
      });
    }, 1);
  };

// Cancel idle callback polyfill
export const cancelIdleCallback = window.cancelIdleCallback || 
  function(id) {
    clearTimeout(id);
  };

// Batch DOM updates
export class DOMBatcher {
  constructor() {
    this.reads = [];
    this.writes = [];
    this.scheduled = false;
  }
  
  read(fn) {
    this.reads.push(fn);
    this.schedule();
  }
  
  write(fn) {
    this.writes.push(fn);
    this.schedule();
  }
  
  schedule() {
    if (!this.scheduled) {
      this.scheduled = true;
      requestAnimationFrame(() => this.flush());
    }
  }
  
  flush() {
    const reads = this.reads.splice(0);
    const writes = this.writes.splice(0);
    
    // Execute all reads first
    reads.forEach(fn => fn());
    
    // Then execute all writes
    writes.forEach(fn => fn());
    
    this.scheduled = false;
  }
}

// Create singleton instance
export const domBatcher = new DOMBatcher();

// Prefetch data for faster navigation
export function prefetchData(urls) {
  if ('link' in document.createElement('link')) {
    urls.forEach(url => {
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.href = url;
      document.head.appendChild(link);
    });
  }
}

// Web Worker for heavy computations
export function createWorker(workerFunction) {
  const blob = new Blob([`(${workerFunction.toString()})()`], { 
    type: 'application/javascript' 
  });
  const url = URL.createObjectURL(blob);
  const worker = new Worker(url);
  
  // Clean up blob URL when worker terminates
  worker.addEventListener('error', () => URL.revokeObjectURL(url));
  
  return worker;
}

// Cache API wrapper for offline support
export class CacheManager {
  constructor(cacheName = 'app-cache-v1') {
    this.cacheName = cacheName;
  }
  
  async cacheResources(urls) {
    if ('caches' in window) {
      const cache = await caches.open(this.cacheName);
      await cache.addAll(urls);
    }
  }
  
  async getCached(request) {
    if ('caches' in window) {
      const cache = await caches.open(this.cacheName);
      const response = await cache.match(request);
      
      if (response) {
        return response;
      }
      
      // Fetch and cache if not found
      const networkResponse = await fetch(request);
      if (networkResponse.ok) {
        cache.put(request, networkResponse.clone());
      }
      
      return networkResponse;
    }
    
    return fetch(request);
  }
  
  async clearCache() {
    if ('caches' in window) {
      await caches.delete(this.cacheName);
    }
  }
}

// Performance monitoring
export class PerformanceMonitor {
  constructor() {
    this.metrics = {};
  }
  
  mark(name) {
    if ('performance' in window) {
      performance.mark(name);
    }
  }
  
  measure(name, startMark, endMark) {
    if ('performance' in window) {
      performance.measure(name, startMark, endMark);
      const measure = performance.getEntriesByName(name)[0];
      this.metrics[name] = measure.duration;
      return measure.duration;
    }
    return 0;
  }
  
  getMetrics() {
    return this.metrics;
  }
  
  logMetrics() {
    console.table(this.metrics);
  }
  
  reportToAnalytics() {
    // Send metrics to analytics service
    if (window.gtag) {
      Object.entries(this.metrics).forEach(([name, value]) => {
        window.gtag('event', 'timing_complete', {
          name,
          value: Math.round(value)
        });
      });
    }
  }
}

// Export singleton instance
export const performanceMonitor = new PerformanceMonitor();

export default {
  debounce,
  throttle,
  memoize,
  lazyLoadImages,
  VirtualScroller,
  requestIdleCallback,
  cancelIdleCallback,
  domBatcher,
  prefetchData,
  createWorker,
  CacheManager,
  performanceMonitor
};