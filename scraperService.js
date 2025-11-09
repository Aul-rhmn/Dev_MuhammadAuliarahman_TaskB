const puppeteer = require('puppeteer');
    const { URL } = require('url');
    const TIMEOUT_MS = 20000;

    /**
     * @param {string} urlString 
     * @returns {boolean} 
     */
    function isValidUrl(urlString) {
        if (!urlString) return false;
        try {

            const url = new URL(urlString);

            return url.protocol === 'http:' || url.protocol === 'https:';
        } catch (e) {
            return false;
        }
    }

    /**
     * @param {string} url 
     * @returns {Promise<object>} 
     */
    async function scrapeUrl(url) {
        if (!isValidUrl(url)) {
            return { error: 'Invalid URL', status: 400 };
        }

        let browser;
        try {
            browser = await puppeteer.launch({
                args: ['--no-sandbox', '--disable-setuid-sandbox']
            });

            const timeoutPromise = new Promise((_, reject) =>
                setTimeout(() => reject(new Error('TimeoutError')), TIMEOUT_MS)
            );

            const scrapePromise = (async () => {
                const page = await browser.newPage();

                const customUserAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';
                await page.setUserAgent(customUserAgent);
                
                console.log(`Scraping: ${url}`);
                
                await page.goto(url, {
                    waitUntil: 'networkidle0', 
                    timeout: TIMEOUT_MS - 500 
                });

                const result = await page.evaluate(() => {
                    const title = document.title || '';
                    const h1 = document.querySelector('h1')?.textContent.trim() || '';
                    const metaDescriptionElement = document.querySelector('meta[name="description"]');
                    const metaDescription = metaDescriptionElement ? metaDescriptionElement.content.trim() : '';

                    return { title, metaDescription, h1 };
                });

                return { ...result, status: 200 };
            })();

            return await Promise.race([scrapePromise, timeoutPromise]);

        } catch (error) {
            if (error.message === 'TimeoutError' || error.name === 'TimeoutError') {
                console.error('Request timed out:', url);
                return { error: 'Timeout', status: 504 }; 
            }

            console.error(`Scraping failed for ${url}:`, error.message);
            return { error: 'Scraping failed (e.g., DNS or connection issue)', status: 500 };

        } finally {
            if (browser) {
                await browser.close();
            }
        }
    }

    module.exports = { scrapeUrl, isValidUrl };