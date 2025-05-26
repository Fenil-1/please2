# Product & Event Listing Website (Google Sheets Powered)

This website allows anyone to showcase events or products directly from a Google Sheet. All content, design settings, and even UI text are managed from the sheet—no code changes required!

## How It Works
- **Google Sheet Driven:**
  - All events/products, site settings, and written content are managed in Google Sheets.
- **Dynamic Listing:**
  - The site displays both events and products, with the display logic adapting based on the "Is Product?" column in the sheet.
- **No-Code Management:**
  - Change colors, fonts, text, links, and more—right from the sheet.

## Quick Start
1. **Set up your Google Sheets** with the required columns for events/products and settings (see `featurelist.md`).
2. **Deploy the website** (static hosting or serverless).
3. **Update content, design, and UI text** from the Google Sheet—no code changes needed!

## Sheet Structure

### Events/Products Sheet
| Name | Description | Date | Price | Cover Photo | Venue | Tags | Label | Is Product? | ... |
|------|-------------|------|-------|-------------|-------|------|-------|-------------|-----|

### Settings Sheet
| Key                | Value                |
|--------------------|----------------------|
| primary_color      | #d43b39              |
| secondary_color    | #fffbe9              |
| accent_color       | #bfa100              |
| neutral_color      | #292323              |
| font_family        | 'Archivo', sans-serif|
| font_size_base     | 16px                 |
| border_radius      | 12px                 |
| homepage_headline  | Welcome to Our Site! |
| homepage_subtext   | Discover events...   |
| ...                | ...                  |

## Features
- Google Sheet integration for all content and settings
- Dynamic event/product listing with "Is Product?" logic
- Sheet-driven theming (colors, fonts, radii)
- Sheet-driven written content (headlines, links, etc.)
- Tag/label filtering and search
- Responsive, accessible, SEO-friendly design
- Detail pages for events and products
- No-code updates for all content and design
- Extensible for new fields/types
- Live preview or instant update on sheet change


