import {expect, test} from '@playwright/experimental-ct-vue';
import {WrappedComponent} from './WrappedComponent';
import {Locator} from "@playwright/test";

test.use({viewport: {width: 500, height: 500}});

let component;

let inputUsername: Locator;
let usernameLabel: Locator;
let submitButton: Locator;

test.beforeEach(async ({ mount, page }) => {
    component = await mount(
        <WrappedComponent />
    );

    inputUsername = page.locator('#inputUsername');
    usernameLabel = page.locator('#feedback p').nth(0);
    submitButton = page.locator('button').first();
});

test(`Button should have dark color`, async ({page}) => {
    await expect(submitButton).toHaveCSS('background-color', 'rgb(33, 37, 41)');
    await expect(submitButton).toHaveText('Press this button');
});