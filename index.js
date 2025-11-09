const express = require('express');
    const { scrapeUrl, isValidUrl } = require('./scraperService');

    const app = express();
    const PORT = process.env.PORT || 3000;

    app.use(express.json());

    app.get('/api/scrape', async (req, res) => {
        const url = req.query.url;

        if (!url || !isValidUrl(url)) {
            console.log(`Error 400: Invalid or missing URL provided: ${url}`);
            return res.status(400).json({ error: 'Invalid URL' });
        }

        try {
            const result = await scrapeUrl(url);

            if (result.status && result.status !== 200) {
                return res.status(result.status).json({ error: result.error });
            }
            
            res.status(200).json({
                title: result.title,
                metaDescription: result.metaDescription,
                h1: result.h1,
                status: 200
            });

        } catch (error) {
            console.error('Unexpected server error:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });

    app.listen(PORT, () => {
        console.log(`\nMicro Scraper API is running on http://localhost:${PORT}`);
        console.log('Test Endpoint: GET /api/scrape?url=https://www.google.com');
    });