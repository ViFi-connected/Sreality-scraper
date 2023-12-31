import puppeteer from "puppeteer";
import {insert} from "./database";
import {Apartment} from "../types";

async function getApartments(){
    const browser = await puppeteer.launch({
        headless: true,
        defaultViewport: null,
        args: ['--no-sandbox']
    });

    const page = await browser.newPage();
    let apartments: Apartment[] = [];
    let pageNumber = 1;
    let apartmentList: Apartment[] = [];

    console.log("Scraping apartments ...");
    do {
        let url = pageNumber === 1 ? "https://www.sreality.cz/en/search/for-sale/apartments" : `https://www.sreality.cz/en/search/for-sale/apartments?page=${pageNumber}`;
        await page.goto(url, {
            waitUntil: "domcontentloaded",
        });
        await page.waitForSelector(".property.ng-scope");

        apartments = await page.evaluate(() => {
            const apartmentList = document.querySelectorAll(".property.ng-scope");

            return Array.from(apartmentList).map((apartment) => {
                const title = apartment!.querySelector(".name.ng-binding")?.textContent;
                const image_url = apartment!.querySelector("a > img")?.getAttribute("src");
                return { title, image_url };
            });
        }) as Apartment[];
        apartmentList.push(...apartments);
        pageNumber++;
    } while (apartmentList.length < 500)
    console.log("Finished scraping");

    console.log("Inserting data into database ...");
    for (let apartment of apartmentList) {
        await insert(apartment);
    }
    console.log("Data inserted");

    await browser.close();
}

export default getApartments;