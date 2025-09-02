interface AnalyticsEvent {
  category: string;
  action: string;
  label?: string;
  value?: number;
  userId?: string;
  timestamp: string;
}

interface PerformanceMetric {
  name: string;
  value: number;
  unit: string;
  timestamp: string;
}

class MonitoringService {
  private gaEnabled: boolean;
  private sentryEnabled: boolean;
  private events: AnalyticsEvent[] = [];
  private metrics: PerformanceMetric[] = [];

  constructor() {
    this.gaEnabled = !!import.meta.env.VITE_GA_TRACKING_ID;
    this.sentryEnabled = !!import.meta.env.VITE_SENTRY_DSN;
    
    this.initializeProviders();
    this.setupPerformanceObserver();
  }

  private initializeProviders() {
    // Initialize Google Analytics
    if (this.gaEnabled && typeof window !== 'undefined') {
      const script = document.createElement('script');
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${import.meta.env.VITE_GA_TRACKING_ID}`;
      document.head.appendChild(script);

      (window as any).dataLayer = (window as any).dataLayer || [];
      (window as any).gtag = function() {
        (window as any).dataLayer.push(arguments);
      };
      (window as any).gtag('js', new Date());
      (window as any).gtag('config', import.meta.env.VITE_GA_TRACKING_ID);
    }

    // Initialize Sentry
    if (this.sentryEnabled) {
      // Dynamic import to reduce bundle size
      // Sentry would be dynamically loaded here if available
      // import('@sentry/browser').then(Sentry => {
      //   Sentry.init({
      //     dsn: import.meta.env.VITE_SENTRY_DSN,
      //     environment: import.meta.env.MODE,
      //     tracesSampleRate: 0.1,
      //   });
      // }).catch(err => {
      //   console.error('Failed to load Sentry:', err);
      // });
    }
  }

  private setupPerformanceObserver() {
    if (typeof window !== 'undefined' && 'PerformanceObserver' in window) {
      // Observe navigation timing
      const perfObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === 'navigation') {
            const navEntry = entry as PerformanceNavigationTiming;
            this.recordMetric('page_load', navEntry.loadEventEnd - navEntry.fetchStart, 'ms');
            this.recordMetric('dom_ready', navEntry.domContentLoadedEventEnd - navEntry.fetchStart, 'ms');
            this.recordMetric('first_byte', navEntry.responseStart - navEntry.fetchStart, 'ms');
          }
        }
      });

      perfObserver.observe({ entryTypes: ['navigation'] });

      // Observe long tasks
      if ('PerformanceObserver' in window && PerformanceObserver.supportedEntryTypes?.includes('longtask')) {
        const longTaskObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            this.recordMetric('long_task', entry.duration, 'ms');
            console.warn('Long task detected:', entry);
          }
        });
        
        longTaskObserver.observe({ entryTypes: ['longtask'] });
      }
    }
  }

  // Track custom events
  trackEvent(
    category: string,
    action: string,
    label?: string,
    value?: number
  ) {
    const event: AnalyticsEvent = {
      category,
      action,
      label,
      value,
      userId: this.getUserId(),
      timestamp: new Date().toISOString()
    };

    this.events.push(event);
    
    // Keep only last 1000 events in memory
    if (this.events.length > 1000) {
      this.events = this.events.slice(-1000);
    }

    // Send to GA
    if (this.gaEnabled && typeof (window as any).gtag !== 'undefined') {
      (window as any).gtag('event', action, {
        event_category: category,
        event_label: label,
        value: value
      });
    }

    // Store locally for analysis
    this.storeEvent(event);
  }

  // Track page views
  trackPageView(path: string, title?: string) {
    this.trackEvent('navigation', 'page_view', path);

    if (this.gaEnabled && typeof (window as any).gtag !== 'undefined') {
      (window as any).gtag('config', import.meta.env.VITE_GA_TRACKING_ID, {
        page_path: path,
        page_title: title
      });
    }
  }

  // Track errors
  trackError(error: Error, context?: string) {
    this.trackEvent('error', error.name, error.message);

    if (this.sentryEnabled) {
      // Sentry error tracking would go here
      // import('@sentry/browser').then(Sentry => {
      //   Sentry.captureException(error, { tags: { context } });
      // });
    }

    console.error('Tracked error:', error, context);
  }

  // Track user interactions
  trackInteraction(element: string, action: string, value?: any) {
    this.trackEvent('interaction', action, element, value);
  }

  // Record performance metrics
  recordMetric(name: string, value: number, unit: string = 'ms') {
    const metric: PerformanceMetric = {
      name,
      value,
      unit,
      timestamp: new Date().toISOString()
    };

    this.metrics.push(metric);

    // Keep only last 500 metrics
    if (this.metrics.length > 500) {
      this.metrics = this.metrics.slice(-500);
    }

    // Track in GA as custom metric
    if (this.gaEnabled && typeof (window as any).gtag !== 'undefined') {
      (window as any).gtag('event', 'timing_complete', {
        name,
        value: Math.round(value),
        event_category: 'performance'
      });
    }
  }

  // Get Web Vitals
  getWebVitals() {
    const vitals: any = {};

    if (typeof window !== 'undefined' && 'performance' in window) {
      const perf = window.performance;
      
      // Get navigation timing
      const navTiming = perf.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      if (navTiming) {
        vitals.FCP = navTiming.responseEnd - navTiming.fetchStart;
        vitals.TTI = navTiming.loadEventEnd - navTiming.fetchStart;
      }

      // Get paint timing
      const paintEntries = perf.getEntriesByType('paint');
      paintEntries.forEach(entry => {
        if (entry.name === 'first-contentful-paint') {
          vitals.FCP = entry.startTime;
        }
      });
    }

    return vitals;
  }

  // Get analytics summary
  getAnalyticsSummary() {
    const eventsByCategory = this.events.reduce((acc, event) => {
      acc[event.category] = (acc[event.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const avgMetrics = this.metrics.reduce((acc, metric) => {
      if (!acc[metric.name]) {
        acc[metric.name] = { total: 0, count: 0, unit: metric.unit };
      }
      acc[metric.name].total += metric.value;
      acc[metric.name].count += 1;
      return acc;
    }, {} as Record<string, any>);

    Object.keys(avgMetrics).forEach(key => {
      avgMetrics[key].average = avgMetrics[key].total / avgMetrics[key].count;
    });

    return {
      totalEvents: this.events.length,
      eventsByCategory,
      metrics: avgMetrics,
      webVitals: this.getWebVitals()
    };
  }

  // Export analytics data
  exportAnalytics(): string {
    const data = {
      events: this.events,
      metrics: this.metrics,
      summary: this.getAnalyticsSummary(),
      exportDate: new Date().toISOString()
    };

    return JSON.stringify(data, null, 2);
  }

  // Helper methods
  private getUserId(): string {
    // Get from auth service or generate anonymous ID
    return localStorage.getItem('user_id') || 'anonymous';
  }

  private storeEvent(event: AnalyticsEvent) {
    try {
      const stored = localStorage.getItem('analytics_events');
      const events = stored ? JSON.parse(stored) : [];
      events.push(event);
      
      // Keep only last 100 events
      if (events.length > 100) {
        events.splice(0, events.length - 100);
      }
      
      localStorage.setItem('analytics_events', JSON.stringify(events));
    } catch (error) {
      console.error('Failed to store analytics event:', error);
    }
  }

  // Session tracking
  startSession() {
    const sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    sessionStorage.setItem('session_id', sessionId);
    this.trackEvent('session', 'start', sessionId);
    return sessionId;
  }

  endSession() {
    const sessionId = sessionStorage.getItem('session_id');
    if (sessionId) {
      this.trackEvent('session', 'end', sessionId);
      sessionStorage.removeItem('session_id');
    }
  }
}

// Singleton instance
export const monitoringService = new MonitoringService();

// React hook
export function useMonitoring() {
  return monitoringService;
}