# UI Automation Test (from Chapter 2)

This repo is for form submission automation test

## Overview

formSubmissionAutomationTest is a project for UI testing of web forms using Playwright. This guide will help you set up Playwright, configure it, and run your tests effectively.

## Prerequisites

- Node.js (version 21 or lower) to avoid version compatibility issues
- Fill "config" to the config.json file in the tests/resources directory
- You can fill in the config like config-example

## Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```
3. Install Playwright and its required browsers:
   ```bash
   npx playwright install
   ``

## How to run

- run this command `npx playwright test`

### Report
- Once the test is complete, html report will be displayed automatically.
