import { test, expect } from '@playwright/experimental-ct-vue';
import Username from '../../src/components/simple-form/Username.vue';
import {Locator} from "@playwright/test";

test.use({ viewport: { width: 500, height: 500 } });

let component;

let inputLabel: Locator;
let inputUsername: Locator;
let validFeedback: Locator;
let invalidFeedback: Locator;

// Testing simple ("stupid") component
test.beforeEach(async ({ mount }) => {
    component = await mount(
        <Username />
    );
    inputLabel = component.locator('label.form-label');
    inputUsername = component.locator('#inputUsername');
    validFeedback = component.locator('div.valid-feedback');
    invalidFeedback = component.locator('div.invalid-feedback');
});

test('Shown', async ({ mount}) => {
    await expect(inputLabel).toBeVisible();
    await expect(inputLabel).toHaveText('Username');
    await expect(inputUsername).toBeVisible();
    await expect(inputUsername).not.toHaveClass('is-invalid');
    await expect(validFeedback).not.toBeVisible();
    await expect(invalidFeedback).toBeVisible();
});

[
    { username: '123', isError: true },
    { username: '1234', isError: false },
    { username: '1234567890123', isError: false },
    { username: '12345678901234', isError: true },
].forEach(tc => {
    test(`Username '${tc.username}' is ${tc.isError ? 'in' : ''}correct`, async ({ mount}) => {
        await inputUsername.type(tc.username);
        if (tc.isError) {
            await expect(inputUsername).toHaveClass(/is-invalid/);
            await expect(invalidFeedback).toBeVisible();
            await expect(invalidFeedback).toHaveText('Username should be between 4 and 13 characters long.');
        } else {
            await expect(inputUsername).toHaveClass(/is-valid/);
            await expect(validFeedback).toBeVisible();
            await expect(validFeedback).toHaveText('Looks good!');
        }
    });
});