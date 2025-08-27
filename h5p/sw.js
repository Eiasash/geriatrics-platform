// Service Worker for Geriatrics Study Platform
// Actually works offline in hospitals

const CACHE_VERSION = 'geriatrics-v3';
const CONTENT_CACHE = 'geriatrics-content-v2';
const DYNAMIC_CACHE = 'geriatrics-dynamic-v2';

// Essential files that MUST be cached
const CRITICAL_URLS = [
    '/',
    '/index.html',
    '/manifest.json'
];

// Install - Cache everything needed for offline use
self.addEventListener('install', event => {
    console.log('[SW] Installing service worker v3...');

    event.waitUntil(
        // Clear all old caches first
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    console.log('[SW] Clearing old cache:', cacheName);
                    return caches.delete(cacheName);
                })
            );
        }).then(() => {
            return caches.open(CACHE_VERSION);
        }).then(cache => {
            console.log('[SW] Caching critical files with fresh content');
            return cache.addAll(CRITICAL_URLS);
        }).then(() => {
            // Force activation immediately
            return self.skipWaiting();
        })
    );
});

// Activate - Clean old caches and take control
self.addEventListener('activate', event => {
    console.log('[SW] Activating service worker...');

    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames
                    .filter(cacheName => {
                        return cacheName.startsWith('geriatrics-') &&
                            cacheName !== CACHE_VERSION &&
                            cacheName !== CONTENT_CACHE &&
                            cacheName !== DYNAMIC_CACHE;
                    })
                    .map(cacheName => {
                        console.log('[SW] Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    })
            );
        }).then(() => {
            // Take control of all pages immediately
            return self.clients.claim();
        })
    );
});

// Fetch - Smart caching strategy for hospital networks
self.addEventListener('fetch', event => {
    const { request } = event;

    // Skip non-GET requests
    if (request.method !== 'GET') return;

    // Parse URL for better handling
    const url = new URL(request.url);

    // Skip external requests
    if (url.origin !== location.origin) {
        return;
    }

    event.respondWith(
        caches.match(request).then(cachedResponse => {
            // If we have it cached, serve it
            if (cachedResponse) {
                console.log('[SW] Serving from cache:', request.url);

                // Update cache in background for next time
                fetchAndCache(request, DYNAMIC_CACHE);

                return cachedResponse;
            }

            // Not in cache - try network
            return fetch(request).then(response => {
                // Only cache successful responses
                if (!response || response.status !== 200) {
                    return response;
                }

                // Clone response before caching
                const responseToCache = response.clone();

                caches.open(DYNAMIC_CACHE).then(cache => {
                    cache.put(request, responseToCache);
                });

                return response;
            }).catch(() => {
                // Network failed - serve offline fallback
                console.log('[SW] Network failed, serving offline fallback');

                // For navigation requests, serve the main app
                if (request.mode === 'navigate') {
                    return caches.match('/index.html');
                }

                // For other requests, return offline message
                return new Response('Offline - content not available', {
                    status: 503,
                    statusText: 'Service Unavailable',
                    headers: new Headers({
                        'Content-Type': 'text/plain'
                    })
                });
            });
        })
    );
});

// Helper function to fetch and cache in background
function fetchAndCache(request, cacheName) {
    fetch(request).then(response => {
        if (response && response.status === 200) {
            caches.open(cacheName).then(cache => {
                cache.put(request, response);
            });
        }
    }).catch(() => {
        // Silent fail for background updates
    });
}

// Message handler for cache management
self.addEventListener('message', event => {
    if (event.data.action === 'skipWaiting') {
        self.skipWaiting();
    }

    if (event.data.action === 'clearCache') {
        caches.keys().then(cacheNames => {
            cacheNames.forEach(cacheName => {
                caches.delete(cacheName);
            });
        });
        event.ports[0].postMessage({ cleared: true });
    }

    if (event.data.action === 'cacheQuizData') {
        // Cache quiz data separately for better management
        caches.open(CONTENT_CACHE).then(cache => {
            cache.put(
                new Request('quiz-data'),
                new Response(JSON.stringify(event.data.quizData), {
                    headers: { 'Content-Type': 'application/json' }
                })
            );
        });
        event.ports[0].postMessage({ cached: true });
    }
});

// Sync quiz results when back online
self.addEventListener('sync', event => {
    if (event.tag === 'sync-quiz-results') {
        event.waitUntil(syncQuizResults());
    }
});

async function syncQuizResults() {
    console.log('[SW] Syncing quiz results to server...');

    // Get stored results from IndexedDB or localStorage
    const results = await getStoredResults();

    if (results && results.length > 0) {
        try {
            // Send to your analytics endpoint
            await fetch('/api/quiz-results', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(results)
            });

            // Clear stored results after successful sync
            await clearStoredResults();
        } catch (error) {
            console.error('[SW] Sync failed:', error);
            // Will retry on next sync event
        }
    }
}

// Placeholder functions - implement with IndexedDB
async function getStoredResults() {
    // Implement IndexedDB read
    return [];
}

async function clearStoredResults() {
    // Implement IndexedDB clear
}

// Pre-cache strategy for quiz content
self.addEventListener('message', event => {
    if (event.data.action === 'precache-quiz') {
        const quizUrls = event.data.urls;
        caches.open(CONTENT_CACHE).then(cache => {
            cache.addAll(quizUrls).then(() => {
                event.ports[0].postMessage({ status: 'cached' });
            });
        });
    }
});