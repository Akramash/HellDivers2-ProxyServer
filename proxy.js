require('dotenv').config(); // Load environment variables
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const bodyParser = require('body-parser');

const app = express();
const apiBaseUrl = process.env.API_BASE_URL; // Use environment variable for API base URL

// Middleware for CORS and preflight requests
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    // intercept OPTIONS method for preflights
    if ('OPTIONS' === req.method) {
        // respond with 200
        console.log('Handling OPTIONS preflight');
        res.sendStatus(200);
    } else {
        // move on
        next();
    }
});

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Proxy middleware options
const options = {
    target: apiBaseUrl, // target host
    changeOrigin: true, // needed for virtual hosted sites
    pathRewrite: {
        '^/api': '', // rewrite paths
    },
    onProxyReq: (proxyReq, req) => {
        // When POSTing data, if there's data to send, explicitly set the Content-Type header
        if (req.body && req.method === 'POST') {
            const bodyData = JSON.stringify(req.body);
            proxyReq.setHeader('Content-Type', 'application/json');
            proxyReq.write(bodyData);
        }
    },
};

// Apply middleware for the path you want to proxy.
app.use('/api', createProxyMiddleware(options));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Proxy server listening on port ${PORT}`));
