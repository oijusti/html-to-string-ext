# HTML to String Converter

This extension allows you to convert an HTML file to:

- a **minified string (JSON)** (`.json`)
- a **minified Base64 string** (`.b64`)

using the right-click context menu in the file explorer (or from the editor title context menu).

## Features

- Convert an HTML file from the file explorer via right-click context menu
- Supports **.html** and **.htm**
- Outputs are saved next to the input HTML file:
  - `.json` (minified HTML string wrapped in JSON)
  - `.b64` (minified HTML base64-encoded)

## Usage

- Right-click an HTML file in the explorer and select one of the conversion commands from the context menu

The extension will:

1. Minify the HTML
2. Either:
   - save `{ "output": "<minified html>" }` into a `.json` file, or
   - base64-encode the minified HTML and save it into a `.b64` file

## Requirements

- No special requirements

## Extension Settings

None

## Release Notes

### 1.0.0

- Initial release with basic support for converting HTML to a JSON string and Base64.
