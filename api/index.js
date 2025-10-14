// Simple API handler for Vue SPA on Vercel
module.exports = (req, res) => {
  // Redirect all requests to the built index.html for SPA routing
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Vue App</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body>
        <div id="app"></div>
        <script type="module" src="/assets/index.js"></script>
      </body>
    </html>
  `);
};