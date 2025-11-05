# Image Placeholder Guide

## Overview

The website is currently configured to load images from placeholder URLs. You can replace these with your actual images later.

## Current Image Placeholders

The website expects **1 image** at the following location:

### Installation Section
- **File**: `images/aquavx_diagram_1.jpg`
- **Section**: Installation → Wiring a 24 VDC 4-20mA Sensor
- **Description**: Wiring diagram showing how to connect 24 VDC 4-20mA sensors to the Aquavx Pro

## How to Add Real Images

### Option 1: Use the Same File Structure (Recommended)

1. Create an `images` folder in the same directory as `index.html`:
   ```
   your-website/
   ├── index.html
   ├── app.js
   ├── content_updated.json
   └── images/
       └── aquavx_diagram_1.jpg
   ```

2. Place your actual image file(s) in the `images/` folder with the exact filename shown above

3. No code changes needed - the site will automatically load your images!

### Option 2: Use a Different Image Hosting Solution

If you want to host images elsewhere (CDN, cloud storage, etc.), you can update the URLs in `content_updated.json`:

1. Open `content_updated.json` in a text editor

2. Search for `"images"` to find the image objects

3. Update the `"url"` field to point to your hosted images:
   ```json
   {
     "id": "img_1",
     "url": "https://your-cdn.com/aquavx_diagram_1.jpg",
     "alt": "Aquavx Diagram 1"
   }
   ```

4. Save the file and refresh your website

## Image Specifications

For best results, your images should be:

- **Format**: JPG, PNG, or GIF
- **Max Width**: 900px (will scale down automatically on mobile)
- **File Size**: Keep under 500KB for fast loading
- **Aspect Ratio**: Any (will maintain original proportions)

## Temporary Solution

If you don't have the actual images yet, the website will display a broken image icon. This won't affect the functionality of the rest of the site - all text, tables, and lists will work normally.

You can also:
- Use placeholder image services like `https://via.placeholder.com/800x600.png?text=Aquavx+Diagram`
- Create simple diagrams using online tools
- Take screenshots from the PDF version if available

## Adding More Images

If you need to add additional images:

1. Edit `content_updated.json`

2. Find the appropriate section

3. Add an image object to the `"images"` array:
   ```json
   "images": [
     {
       "id": "img_2",
       "url": "images/new_diagram.jpg",
       "alt": "New Diagram Description"
     }
   ]
   ```

4. The image will appear inline with the content in that section

## Notes

- Images are styled with rounded corners and shadows automatically
- Images are responsive and will scale to fit mobile screens
- Alt text is important for accessibility and SEO
- Missing images won't break the website functionality
