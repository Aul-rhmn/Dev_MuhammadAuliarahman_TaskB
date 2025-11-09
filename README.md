#  Micro Scraper API

A lightweight web scraping API built with **Node.js**, **Express**, and **Puppeteer**.  
This API allows users to scrape the `<title>`, `<meta name="description">`, and first `<h1>` element from any given webpage URL.
---

##  Features

- **GET /api/scrape?url=...** — main endpoint for scraping.
- Extracts:
  - Page **Title**
  - **Meta Description**
  - First **H1** tag
- **Automatic timeout** after 20 seconds (prevents long-running scrapes).
- **Custom User-Agent** to simulate a real Chrome browser.
- **Error handling** with appropriate HTTP response codes.
- **Simple JSON output**, ready for integration with other services.

---

##  Features

- **GET /api/scrape?url=...** — main endpoint for scraping.
- Extracts:
  - Page **Title**
  - **Meta Description**
  - First **H1** tag
- **Automatic timeout** after 20 seconds (prevents long-running scrapes).
- **Custom User-Agent** to simulate a real Chrome browser.
- **Error handling** with appropriate HTTP response codes.
- **Simple JSON output**, ready for integration with other services.

---

##  Tech Stack

| Component | Description |
|------------|-------------|
| **Node.js** | JavaScript runtime |
| **Express** | Web framework for API routing |
| **Puppeteer** | Headless browser for scraping |
| **Nodemon** | Auto-restart tool for development |

---

##  Project Structure

```

micro-scraper-api/
├─ index.js                # Main Express server
├─ scraperService.js       # Puppeteer logic and utility functions
├─ package.json            # Dependencies and scripts
└─ README.md               # Project documentation

````

---

##  Installation

1. **Clone this repository**
   ```bash
   git clone https://github.com/Aul-rhmn/micro-scraper.git
   cd micro-scraper-api
````

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Run the server**

   ```bash
   npm run dev
   ```

   or for production:

   ```bash
   npm start
   ```

4. API will run on:

   ```
   http://localhost:3000
   ```

---

##  API Usage

### **Endpoint**

```
GET /api/scrape?url=<target_url>
```

### **Example Request**

```bash
curl "http://localhost:3000/api/scrape?url=https://example.com"
```

### **Example Response**

```json
{
  "title": "Example Domain",
  "metaDescription": "This domain is for use in illustrative examples in documents.",
  "h1": "Example Domain",
  "status": 200
}
```

---

##  Error Responses

| Status Code | Description                          | Example                                                          |
| ----------- | ------------------------------------ | ---------------------------------------------------------------- |
| **400**     | Invalid or missing URL               | `{ "error": "Invalid URL" }`                                     |
| **504**     | Timeout (page took too long to load) | `{ "error": "Timeout" }`                                         |
| **500**     | Internal or scraping failure         | `{ "error": "Scraping failed (e.g., DNS or connection issue)" }` |

---

##  How It Works

1. Validates the input URL using Node’s `URL` object.
2. Launches a **headless Chromium** browser via Puppeteer.
3. Waits until the page finishes loading (`networkidle0`).
4. Extracts:

   * `<title>` text
   * `<meta name="description">` content
   * First `<h1>` tag text
5. Returns results as JSON.
6. Automatically cancels if scraping exceeds **20 seconds**.

---

##  Scripts

| Command       | Description                         |
| ------------- | ----------------------------------- |
| `npm start`   | Run the server (production mode)    |
| `npm run dev` | Run with Nodemon (development mode) |

---

##  License

This project is licensed under the **ISC License**.

```