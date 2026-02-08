const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;
const SERVICE_URL = process.env.SERVICE_URL || "http://localhost";

// Auth Service
app.use("/api/auth", createProxyMiddleware({
    target: `${SERVICE_URL}:${process.env.AUTH_PORT || 3001}`,
    changeOrigin: true
}));

// Wallet Service (mapped to /api/ride as per user request, port 3002)
app.use("/api/ride", createProxyMiddleware({
    target: `${SERVICE_URL}:${process.env.WALLET_PORT || 3002}`,
    changeOrigin: true
}));

// Marketiqon Service (mapped to /api/ecom as per user request, port 3003)
app.use("/api/ecom", createProxyMiddleware({
    target: `${SERVICE_URL}:${process.env.MARKETIQON_PORT || 3003}`,
    changeOrigin: true
}));

// Buyla Service
app.use("/api/buyla", createProxyMiddleware({
    target: `${SERVICE_URL}:${process.env.BUYLA_PORT || 3004}`,
    changeOrigin: true
}));

// Admin Service
app.use("/api/admin", createProxyMiddleware({
    target: `${SERVICE_URL}:${process.env.ADMIN_PORT || 3005}`,
    changeOrigin: true
}));

app.listen(PORT, () => {
    console.log(`API Gateway (Server.js) running on port ${PORT}`);
});
