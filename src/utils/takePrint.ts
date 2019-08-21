import { Page } from "puppeteer";

export default async (page: Page) => await page.screenshot({path: `screenshots/${new Date().toISOString()}.png`});