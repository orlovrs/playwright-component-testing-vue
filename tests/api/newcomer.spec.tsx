import {test, expect} from '@playwright/experimental-ct-vue';
import {WrappedComponent} from './WrappedComponent';
import {Locator} from "@playwright/test";

test.use({viewport: {width: 500, height: 500}});

let component;

let card: Locator;

let spinner: Locator;
let photo: Locator;
let name: Locator;
let location: Locator;
let phone: Locator;
let email: Locator;
let error: Locator;

async function initElements(page, mount) {
    component = await mount(
        <WrappedComponent/>
    );

    card = page.locator('.card');
    spinner = page.locator('#spinner');
    photo = page.locator('.card-img-top');
    name = page.locator('.card-body h5');
    location = page.locator('.card-body p');
    email = page.locator('div.card ul li').first();
    phone = page.locator('div.card ul li').last();
    error = page.locator('#error');
}

test('Initial state', async ({mount, page}) => {
    await page.route(/randomuser.me\/api/, async route => {
        setTimeout(async () => {
            const response = await route.fetch();
            const json = await response.json();
            await route.fulfill({
                response,
                body: JSON.stringify(json)
            })
        }, 100 * 1000);
    });

    await initElements(page, mount);

    await expect(card).not.toBeVisible();
    await expect(spinner).toBeVisible();
});

test('Successful loading', async ({page, mount}) => {
    const photoUrl = 'https://google.com';
    const firstname = 'Roman';
    const lastname = 'Orlov';
    const country = 'Poland';
    const city = 'Krakow';
    const phoneNumber = '+48 321 654 987';
    const emailAddress = 'roman_orlov@epam.com';

    await page.route(/randomuser.me\/api$/, async route => {
        await route.fulfill({
            status: 200,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                results: [{
                    picture: {
                        large: photoUrl
                    },
                    name: {
                        first: firstname,
                        last: lastname,
                    },
                    location: {
                        city: city,
                        country: country
                    },
                    email: emailAddress,
                    phone: phoneNumber
                }]
            })
        });
    });

    await initElements(page, mount);

    await page.waitForResponse(/randomuser.me\/api$/);

    await expect(photo).toBeVisible();
    await expect(photo).toHaveAttribute('src', photoUrl);

    await expect(name).toBeVisible();
    await expect(name).toHaveText(`${firstname} ${lastname}`);

    await expect(location).toBeVisible();
    await expect(location).toHaveText(`${city}, ${country}`);

    await expect(email).toBeVisible();
    await expect(email).toContainText(emailAddress);

    await expect(phone).toBeVisible();
    await expect(phone).toContainText(phoneNumber);
});

test('Loading with error', async ({page, mount}) => {
    await page.route(/randomuser.me\/api$/, async route => {
        await route.fulfill({
            status: 404,
            headers: { 'Content-Type': 'application/json' }
        });
    });

    await initElements(page, mount);

    await page.waitForResponse(/randomuser.me\/api$/);

    await expect(error).toBeVisible();
    await expect(error).toContainText('Something went wrong, try to reload the page...');
});