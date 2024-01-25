// index.js

// Require Puppeteer.
const puppeteer = require("puppeteer");
const fs = require("fs");

(async function () {
  try {
    // Launch a new browser session.
    const browser = await puppeteer.launch();
    // Open a new `Page`.
    const html = fs.readFileSync("resume.html", "utf-8");
    const page = await browser.newPage();

    await page.setContent(html, { waitUntil: "domcontentloaded" });

    // To reflect CSS used for screens instead of print
    await page.emulateMediaType("screen");

    // Download the PDF
    const pdf = await page.pdf({
      path: "resume.pdf",
      margin: { top: "30px", right: "50px", bottom: "10px", left: "50px" },
      printBackground: true,
      format: "A4",
    });

    await browser.close();
  } catch (e) {
    console.log(e);
  }
})();
