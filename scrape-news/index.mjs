const playwright = require('playwright');

(async () => {
    const browser = await playwright.chromium.launch();
    const page = await browser.newPage();
    // await page.goto('https://www.pap.pl/en');
    //
    // const newsElement = await page.waitForSelector('h1 > a');
    // const newsHTML = await page.evaluate(
    //   (element: { textContent: any }) => element.textContent,
    //   newsElement
    // );
    //
    // console.log("PAP: ",newsHTML);
    //
    // await page.goto('https://www.nytimes.com//');
    //
    // const newsElement2 = await page.waitForSelector('[data-hierarchy=feed] h3:first-child');
    // const newsHTML2 = await page.evaluate(
    //   (element: { textContent: any }) => element.textContent,
    //   newsElement2
    // );
    //
    // console.log("NY: ",newsHTML2);
    //
    // await page.goto('https://www.telegraph.co.uk/');
    //
    // const newsElement3 = await page.waitForSelector('[data-test=headline] span');
    // const newsHTML3 = await page.evaluate(
    //   (element: { textContent: any }) => element.textContent,
    //   newsElement3
    // );
    //
    // console.log("TELEGRAPH: ",newsHTML3);
    //
    // await page.goto('https://www.dw.com/en');
    //
    // const newsElement4 = await page.waitForSelector('[data-tracking-name=section-top-story] h3');
    // const newsHTML4 = await page.evaluate(
    //   (element: { textContent: any }) => element.textContent,
    //   newsElement4
    // );
    //
    // console.log("DW: ",newsHTML4);
    //
    // await page.goto('https://www.lemonde.fr/en');
    //
    // const newsElement5 = await page.waitForSelector('a > h1');
    // const newsHTML5 = await page.evaluate(
    //   (element: { textContent: any }) => element.textContent,
    //   newsElement5
    // );
    //
    // console.log("LEMONDE: ",newsHTML5);

    await page.goto('https://www.lemonde.fr/en');

    // const newsElement6 = await page.waitForSelector('h1 > span');
    const newsHTML6 = await page.$$eval('a',
        (element) => {
            const data = [];
            element.forEach(
                (book) => {
                    const name = book.querySelector("h1")?.innerText;

                    name && data.push({ name });
                }
            );
            return data;
        },

    );

    console.log("TASS: ",newsHTML6);

    await browser.close();
})();
