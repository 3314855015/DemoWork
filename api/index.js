// Vercel serverless function to serve Vue SPA
const { createServer } = require('http');
const { readFileSync } = require('fs');
const { join } = require('path');

module.exports = (req, res) => {
  // Serve static files from dist directory
  if (req.url.startsWith('/assets/') || req.url.endsWith('.js') || req.url.endsWith('.css')) {
    try {
      const filePath = join(__dirname, '../dist', req.url);
      const content = readFileSync(filePath);
      const ext = req.url.split('.').pop();
      const contentType = {
        js: 'application/javascript',
        css: 'text/css',
        html: 'text/html'
      }[ext] || 'text/plain';
      
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content);
    } catch (error) {
      res.writeHead(404);
      res.end('File not found');
    }
    return;
  }

  // Serve index.html for all other routes (SPA routing)
  try {
    const indexHtml = readFileSync(join(__dirname, '../dist/index.html'), 'utf8');
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(indexHtml);
  } catch (error) {
    res.writeHead(500);
    res.end('Error serving application');
  }
};