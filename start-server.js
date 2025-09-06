const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

// Load environment variables
require('dotenv').config();

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || 'localhost';

// MIME types
const mimeTypes = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.wav': 'audio/wav',
  '.mp4': 'video/mp4',
  '.woff': 'application/font-woff',
  '.ttf': 'application/font-ttf',
  '.eot': 'application/vnd.ms-fontobject',
  '.otf': 'application/font-otf',
  '.wasm': 'application/wasm'
};

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url);
  let pathname = `.${parsedUrl.pathname}`;
  
  // Default to index.html for root
  if (pathname === './') {
    pathname = './index.html';
  }
  
  // API Routes
  if (pathname.startsWith('./api/')) {
    handleApiRequest(req, res, pathname);
    return;
  }
  
  // Static file serving
  const ext = path.parse(pathname).ext;
  const map = mimeTypes[ext] || 'text/plain';
  
  fs.readFile(pathname, (err, data) => {
    if (err) {
      // Fallback to index.html for SPA routing
      if (err.code === 'ENOENT') {
        fs.readFile('./index.html', (indexErr, indexData) => {
          if (indexErr) {
            res.statusCode = 404;
            res.end('File not found');
          } else {
            res.setHeader('Content-type', 'text/html');
            res.end(indexData);
          }
        });
      } else {
        res.statusCode = 500;
        res.end('Server error');
      }
    } else {
      res.setHeader('Content-type', map);
      res.end(data);
    }
  });
});

function handleApiRequest(req, res, pathname) {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  // Health check
  if (pathname === './api/health') {
    res.end(JSON.stringify({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      version: '2.0.0',
      services: {
        platform: 'running',
        api: 'active',
        ai: process.env.OPENAI_API_KEY ? 'configured' : 'not configured',
        azure: process.env.AZURE_COGNITIVE_KEY ? 'configured' : 'not configured'
      }
    }));
    return;
  }
  
  // AI Assistant endpoint
  if (pathname === './api/ask-ai' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      const data = JSON.parse(body);
      // Simulate AI response
      const response = {
        response: `Clinical AI Response: Based on your query "${data.question}", here are the recommendations for geriatric care...`,
        timestamp: new Date().toISOString(),
        confidence: 0.95
      };
      res.end(JSON.stringify(response));
    });
    return;
  }
  
  // Default API response
  res.statusCode = 404;
  res.end(JSON.stringify({ error: 'API endpoint not found' }));
}

server.listen(PORT, HOST, () => {
  console.log(`🎉 Geriatrics Platform v2.0 running on http://${HOST}:${PORT}`);
  console.log(`📊 Health check: http://${HOST}:${PORT}/api/health`);
  console.log(`🏥 Ready to serve patients and families!`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('👋 Shutting down gracefully...');
  server.close(() => {
    process.exit(0);
  });
});
