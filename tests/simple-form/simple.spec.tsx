import { test, expect } from '@playwright/experimental-ct-vue';
import Simple from '../../src/components/simple-form/Simple.vue';
import {Locator} from "@playwright/test";

test.use({ viewport: { width: 500, height: 500 } });

let component;

let inputUsername: Locator;
let usernameLabel: Locator

test.beforeEach(async ({ mount }) => {
    component = await mount(
        <Simple />
    );

    inputUsername = component.locator('#inputUsername');
    usernameLabel = component.locator('#feedback p').nth(0);
});

test('Verify changes without emitting', async () => {
    const inputText = 'Test';
    await inputUsername.type(inputText);
    await expect(usernameLabel).toContainText(inputText);
});