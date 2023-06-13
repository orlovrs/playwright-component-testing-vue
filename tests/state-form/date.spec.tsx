import { test, expect } from '@playwright/experimental-ct-vue';
import {WrappedComponent} from './WrappedComponent';
import {Locator} from "@playwright/test";

test.use({ viewport: { width: 500, height: 500 } });

let dateInput: Locator;
let dateDialog: Locator;
let yearsButton: Locator;
let monthsButton: Locator;
let selectButton: Locator;
let yearButton: (y) => Locator;
let monthButton: (m) => Locator;
let dayButton: (d) => Locator;

test.beforeEach(async ({ mount, page }) => {
    await mount(
        <WrappedComponent />
    );

    dateInput = page.locator('div.dp__main input');
    dateDialog = page.locator('div[role="dialog"]');
    yearsButton = dateDialog.locator('button[aria-label="Open years overlay"]');
    monthsButton = dateDialog.getByRole('button', { name: 'Open months overlay' });
    selectButton = dateDialog.locator('button.dp__action_select');
    yearButton = (y) => dateDialog.getByRole('gridcell', { name: y });
    monthButton = (m) => {
        const namesArray = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        return dateDialog.getByRole('gridcell', { name: namesArray[m] });
    }
    dayButton = (d) => dateDialog.locator(`//div[contains(@class, 'dp__cell_inner') and text() = '${d}']`);
});

[
    { date: addDaysAndYearsToCurrentDate(-1, -70), active: false },
    { date: addDaysAndYearsToCurrentDate(0, -70), active: true },
    { date: addDaysAndYearsToCurrentDate(), active: true },
    { date: addDaysAndYearsToCurrentDate(1, 0), active: false },
].forEach(tc => {
    test(`Verify date - ${tc.date.toDateString()} should be ${tc.active ? '' : 'in' }active`, async ({ page }) => {
        await dateInput.click();
        await yearsButton.click();
        await yearButton(tc.date.getFullYear()).click();
        await monthsButton.click();
        await monthButton(tc.date.getMonth()).click();
        tc.active ?
            await expect(dayButton(tc.date.getDate())).not.toHaveClass(/dp__cell_disabled/) :
            await expect(dayButton(tc.date.getDate())).toHaveClass(/dp__cell_disabled/);
    });
});

function addDaysAndYearsToCurrentDate(days = 0, years = 0) {
    const date = new Date();
    date.setFullYear(date.getFullYear() + years);
    date.setDate(date.getDate() + days);
    return date;
}