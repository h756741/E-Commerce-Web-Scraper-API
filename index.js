// backend requirements
const express = require('express');
const request = require('request-promise');
const dotenv = require('dotenv').config();

// intialize app
const app = express();
const PORT = process.env.PORT || 5001;

// keys
const apiKey = process.env.API_KEY;
const baseUrl = `https://api.scraperapi.com?api_key=${apiKey}&autoparse=true`;

// parse json
app.use(express.json());

// initial route
app.get('/', (req, res) => {
    res.send('Welcome to Amazon Scraper API.');
})

// get product response
app.get('/products/:productId', async (req, res) => {
    const { productId } = req.params;

    try {
        const response = await request(`${baseUrl}&url=https://www.amazon.com/dp/${productId}`);

        res.json(JSON.parse(response));
    } catch (error) {
        res.json(error);
    }
})

// get product reviews
app.get('/products/:productId/reviews', async (req, res) => {
    const { productId } = req.params;

    try {
        const response = await request(`${baseUrl}&url=https://www.amazon.com/product-reviews/${productId}`);

        res.json(JSON.parse(response));
    } catch (error) {
        res.json(error);
    }
})

// get product offers
app.get('/products/:productId/offers', async (req, res) => {
    const { productId } = req.params;

    try {
        const response = await request(`${baseUrl}&url=https://www.amazon.com/gp/offer-listing/${productId}`);

        res.json(JSON.parse(response));
    } catch (error) {
        res.json(error);
    }
})

// get search results
app.get('/search/:searchQuery', async (req, res) => {
    const { searchQuery } = req.params;

    try {
        const response = await request(`${baseUrl}&url=https://www.amazon.com/s?k=${productId}`);

        res.json(JSON.parse(response));
    } catch (error) {
        res.json(error);
    }
})

// listen to port
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));