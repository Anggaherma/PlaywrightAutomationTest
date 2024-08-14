// @ts-check
const { test, expect } = require("@playwright/test");
const config = require("./resources/config.json")

test("Access The Web Page", async ({ page }) => {
  // Go to web page".
  await page.goto(config.baseUrl);

  // Expect a title to contain "Sample Web Form".
  await expect(page).toHaveTitle("Sample Web Form");

});

test("UI Element Presence", async ({ page }) => {
  // Go to web page".
  await page.goto(config.baseUrl);

  // Ensure that the "Title" is present.
  await expect(page.locator('#title')).toBeVisible();

  // Ensure that the "First Name" is present.
  await expect(page.locator('#firstName')).toBeVisible();

  // Ensure that the "Middle Name" is present.
  await expect(page.locator('#middleName')).toBeVisible();

  // Ensure that the "Last Name" is present.
  await expect(page.locator('#lastName')).toBeVisible();

  // Ensure that the "Email" is present.
  await expect(page.locator('#email')).toBeVisible();

  // Ensure that the "Phone Number" is present.
  await expect(page.locator('#phone')).toBeVisible();

  // Ensure that the "Date of Birth" is present.
  await expect(page.locator('#dob')).toBeVisible();

  // Ensure that the "Gender" is present.
  await expect(page.locator('.gender-switch')).toBeVisible();

  // Ensure that the "Province" is present.
  await expect(page.locator('#province')).toBeVisible();

  // Ensure that the "City" is present.
  await expect(page.locator('#city')).toBeVisible();

  // Ensure that the "Submit" is present.
  await expect(page.locator('button[type="submit"]')).toBeVisible();
});

test("Positive Case - Submit form success", async ({ page }) => {

  await page.goto(config.baseUrl);

  // Select title
  await page.getByLabel('Title*').selectOption(config.title);

  // Fill First Name
  await page.getByLabel('First Name*').fill(config.firstName);

  // Fill Middle Name
  await page.getByLabel('Middle Name*').fill(config.middleName);

  // Fill Last Name
  await page.getByLabel('Last Name*').fill(config.lastName);

  // Fill email
  await page.getByLabel('Email*').fill(config.email);

  // Fill Phone Number
  await page.getByLabel('Phone Number*').fill(config.phoneNumber);

  // Fill DOB
  await page.getByLabel('Date of Birth*').fill(config.dob);

  // Select gender
  await page.getByText('Male Female').click();

  // Select province
  await page.getByLabel('Address*').selectOption(config.province);

  // Select city
  await page.locator('#city').selectOption(config.city);

  // Click submit button and verifiy button functionality
  await page.getByRole('button', { name: 'Submit' }).click();

  // Verifiy prompt for submits successfully
  await expect(page.locator('text=User Information')).toBeVisible;
  await expect(page.locator('#modalContent')).toHaveText(new RegExp(`${config.title} ${config.firstName} ${config.middleName} ${config.lastName}`));
  await expect(page.locator('#modalContent')).toHaveText(new RegExp(`${config.email}`));
  await expect(page.locator('#modalContent')).toHaveText(new RegExp(`${config.phoneNumber}`));
  await expect(page.locator('#modalContent')).toHaveText(new RegExp(`${config.province}`));
  await expect(page.locator('#modalContent')).toHaveText(new RegExp(`${config.city}`));

});

test("Negative Case - Submit form invalid", async ({ page }) => {

  await page.goto("https://flip-sample-form.onrender.com");

  // Select title
  await page.getByLabel('Title*').selectOption('Mr.');

  // Fill First Name
  await page.getByLabel('First Name*').fill('first');

  // Fill Middle Name
  await page.getByLabel('Middle Name*').fill('middle');

  // Fill Last Name
  await page.getByLabel('Last Name*').fill('last');

  // Fill invalid email format
  await page.getByLabel('Email*').fill('test.gmail.com');

  // Fill Phone Number
  await page.getByLabel('Phone Number*').fill('085878500367');

  // Fill DOB
  await page.getByLabel('Date of Birth*').fill('2001-01-01');

  // Select gender
  await page.getByText('Male Female').click();

  // Select province
  await page.getByLabel('Address*').selectOption('DKI Jakarta');

  // Select city
  await page.locator('#city').selectOption('Jakarta Selatan');

  // Click submit button
  await page.getByRole('button', { name: 'Submit' }).click();

  // Verifiy can't proceed to submits and there is error notification
  await expect(page.getByText('Invalid email format')).toBeVisible;

});
