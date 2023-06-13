import {expect, test} from '@playwright/experimental-ct-vue';
import Button from '../../src/components/simple-form/Button.vue';

test.use({ viewport: { width: 500, height: 500 } });

// Passing props in component
[
    { name: 'primary', color: 'rgb(13, 110, 253)' },
    { name: 'secondary', color: 'rgb(108, 117, 125)' },
    { name: 'success', color: 'rgb(25, 135, 84)' },
    { name: 'danger', color: 'rgb(220, 53, 69)' },
    { name: 'warning', color: 'rgb(255, 193, 7)' },
    { name: 'info', color: 'rgb(13, 202, 240)' },
    { name: 'light', color: 'rgb(248, 249, 250)' },
    { name: 'dark', color: 'rgb(33, 37, 41)' },
    { name: 'link', color: 'rgba(0, 0, 0, 0)' },
    { name: 'random string', color: 'rgb(13, 110, 253)' }
].forEach(tc => {
    test(`${tc.name} button should have ${tc.color} color`, async ({ mount }) => {
        const component = await mount(<Button btn-type={tc.name} label='Test' />);
        const button = component.locator('button');
        await expect(button).toHaveCSS('background-color', tc.color);
    });
});

test('Button should have received label', async ({ mount}) => {
    const label = 'Test label';
    const component = await mount(<Button btn-type='primary' label={label} />);
    const button = component.locator('button');
    await expect(button).toHaveText(label);
});