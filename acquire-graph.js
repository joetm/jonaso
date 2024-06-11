#!/usr/bin/env node

const puppeteer = require('puppeteer');

const fs = require('fs');
const util = require('util');
const copyFilePromise = util.promisify(fs.copyFile);
// Async function to copy a file and return
async function copyAndReturn(source, destination) {
  try {
    await copyFilePromise(source, destination);
    console.log('File was copied successfully');
    return 'File copied successfully';  // Return a success message
  } catch (err) {
    console.error('Error occurred:', err);
    throw err;  // Rethrow or handle error as needed
  }
}


(async () => {

  // 1. Launch the browser
  const browser = await puppeteer.launch({
      defaultViewport: {
          width: 1020,
          height: 400,
          isLandscape: true
      }
  });

  // 2. Open a new page
  const page = await browser.newPage();

  // 3. Navigate to URL
  await page.goto('https://jonaso.de/publications/', { waitUntil: 'networkidle0' });

	// // 4. Take screenshot
  //  await page.screenshot({path: 'graph.png'});

  /**
   * Takes a screenshot of a DOM element on the page, with optional padding.
   * https://gist.github.com/malyw/b4e8284e42fdaeceab9a67a9b0263743
   *
   * @param {!{path:string, selector:string, padding:(number|undefined)}=} opts
   * @return {!Promise<!Buffer>}
   */
  async function screenshotDOMElement(opts = {}) {
      const padding = 'padding' in opts ? opts.padding : 0;
      const path = 'path' in opts ? opts.path : null;
      const selector = opts.selector;

      if (!selector) {
          throw Error('Please provide a selector.');
      }

      const rect = await page.evaluate(selector => {
          const element = document.querySelector(selector);
          if (!element) {
              return null;
          }
          const {x, y, width, height} = element.getBoundingClientRect();
          return {left: x, top: y, width, height, id: element.id};
      }, selector);

      if (!rect) {
          // throw Error(`Could not find element that matches selector: ${selector}.`);
          // if jonaso.de/publications is broken at the time of build, use a fallback graph
          try {
            await new Promise((resolve, reject) => {
                fs.copyFile('graph-BAK.png', 'graph.png', (err) => {
                    if (err) {
                        console.error('Error occurred:', err)
                        reject(err)
                    } else {
                        console.log('Used fallback for citation scraped citation graph. Something may be wrong with jonaso.de/publications/')
                        resolve()
                    }
                });
            });
          } catch (error) {
              // Handle or log the error as needed
              // console.error('Failed to copy file:', error)
              throw Error(`Failed to copy file: ${error}`);
          }
          return null
      }

      return await page.screenshot({
          path,
          clip: {
              x: rect.left - padding,
              y: rect.top - padding,
              width: rect.width + padding * 2,
              height: rect.height + padding * 2
          }
      });
  }

  await screenshotDOMElement({
      path: 'graph.png',
      selector: 'div.recharts-responsive-container',
      padding: 16
  });


  await browser.close();
})();

