const express = require("express");
const puppeteer = require('puppeteer');

module.exports = (db) => {
    const router = express.Router();

    router.post('/', async (req, res) => {
        const ID = req.body.stuID;
        const PAS = req.body.pass;
        const MA = req.body.mat;

        if (!ID || !PAS || !MA) {
            return res.status(400).send('กรุณากรอกข้อมูลให้ครบถ้วน');
        } else {
            try {
                const browser = await puppeteer.launch({
                    headless: true,
                    args: ['--no-sandbox', '--disable-setuid-sandbox']
                });
                const page = await browser.newPage();
                await page.goto(`http://202.129.48.202/${MA}/`);

                await page.type('#ContentPlaceHolder1_TextBox1', ID);
                await page.type('#ContentPlaceHolder1_TextBox2', PAS);

                await Promise.all([
                    page.click('#ContentPlaceHolder1_Button1'),
                    page.waitForNavigation({ waitUntil: 'domcontentloaded' })
                ]);

                await page.waitForSelector('#ContentPlaceHolder1_Label3');
                const errorMessage = await page.$eval('#ContentPlaceHolder1_Label3', (element) => element.innerText);
                if (errorMessage.includes('ไม่พบข้อมูลนักเรียนหมายเลขประจำตัว')) {
                    await browser.close();
                    return res.status(401).send(`ไม่พบข้อมูลนักเรียนหมายเลขประจำตัว ${ID}`);
                }

                await page.waitForSelector('#ContentPlaceHolder1_Label2');
                await page.waitForSelector('#ContentPlaceHolder1_GridView1');

                const Header = await page.$eval('#ContentPlaceHolder1_Label2', (element) => element.innerText);
                const HeaderName = await page.$eval('#ContentPlaceHolder1_Label3', (element) => element.innerText);

                const GradeTable = await page.$$eval('#ContentPlaceHolder1_GridView1 tr', rows => {
                    return rows
                        .map(row => {
                            const cells = Array.from(row.querySelectorAll('td'));
                            return cells.map(cell => cell.innerText.trim());
                        })
                        .filter(row => row.some(cell => cell !== ""));
                });

                const DetailsTable = await page.$$eval('table[style="width: 882px; border: 1px solid #4B85B6"] tr', rows => {
                    return rows.map(row => {
                        const cells = Array.from(row.querySelectorAll('td, span'));
                        const filteredCells = cells
                            .map(cell => cell.innerText.trim())
                            .filter((value, index, self) => value !== "" && (index === 0 || value !== self[index - 1]));
                        return filteredCells;
                    });
                });

                await browser.close();

                res.json({ Header, HeaderName, GradeTable, DetailsTable });
            } catch (error) {
                res.status(500).send(`ไม่สามารถดึงข้อมูลได้ (${error.message})`);
            }
        }
    });


    return {
        baseRoute: '/grade',
        router,
    };
};
