# How to Add Hyperlinks to Content

## Format

To add a clickable link in your content, use standard HTML anchor tags in the JSON:

```json
"content": [
  "Your text before the link",
  "<a href='URL' target='_blank'>Link Text</a>",
  "Your text after the link"
]
```

## Examples

### Example 1: External Link (Opens in New Tab)
```json
"content": [
  "For more information, visit our website:",
  "<a href='https://example.com' target='_blank'>Visit Example.com</a>"
]
```

### Example 2: Link Within Text
```json
"content": [
  "Download the <a href='https://example.com/manual.pdf' target='_blank'>User Manual</a> for complete instructions."
]
```

### Example 3: Email Link
```json
"content": [
  "Contact support at <a href='mailto:support@example.com'>support@example.com</a>"
]
```

### Example 4: Multiple Links
```json
"content": [
  "Resources:",
  "<a href='https://example.com/docs' target='_blank'>Documentation</a>",
  "<a href='https://example.com/support' target='_blank'>Support Portal</a>",
  "<a href='https://example.com/training' target='_blank'>Training Videos</a>"
]
```

## Link Attributes

### Required:
- `href='URL'` - The destination URL

### Recommended:
- `target='_blank'` - Opens link in new tab (best for external links)

### Optional:
- `rel='noopener'` - Security best practice when using target='_blank'

**Complete example with security:**
```json
"<a href='https://example.com' target='_blank' rel='noopener'>Link Text</a>"
```

## Styling

Links are automatically styled with:
- Blue color matching the site theme
- Underline on hover
- Smooth transition effects
- Maintains color even after clicking (visited state)

## Where to Add Links

Links work in:
- ✅ Section content paragraphs
- ✅ Subsection content paragraphs
- ❌ List items (not currently supported)
- ❌ Table cells (not currently supported)
- ❌ Section titles (not recommended)

## Real Example from Your Site

**Location:** Assisted Configuration section

**JSON:**
```json
{
  "title": "Assisted Configuration",
  "content": [
    "For fastest setup, perform the field wiring then fill out the online configuration form and submit it to Cattron Support:",
    "<a href='https://cattroncontrol.com/aquavx-configuration' target='_blank'>Online Configuration Form</a>",
    "Once the form is submitted, a configuration file will be generated and uploaded to the device remotely, or provided by email to be loaded onto the device with a USB thumb drive.",
    "For more information, contact your Cattron representative."
  ]
}
```

**Result:** The text "Online Configuration Form" will appear as a blue clickable link that opens in a new tab.

## Important Notes

### ⚠️ Use Single Quotes
Always use single quotes (`'`) for HTML attributes inside JSON:
```json
✅ Correct: "<a href='https://example.com'>Link</a>"
❌ Wrong:   "<a href="https://example.com">Link</a>"  // Breaks JSON
```

### ⚠️ Escape Special Characters
If your URL contains special characters, make sure they're properly formatted:
```json
"<a href='https://example.com/page?id=123&amp;type=doc'>Link</a>"
```

### ⚠️ Test Your Links
After adding links:
1. Save the JSON file
2. Refresh your browser
3. Click the link to verify it works
4. Check that it opens in a new tab (if using target='_blank')

## Adding Links to Other Content Types

### To add links in lists (future enhancement):
Currently not supported. List items are escaped. If you need this feature, let me know and I can update the code.

### To add links in tables (future enhancement):
Currently not supported. Table cells are escaped. If you need this feature, let me know and I can update the code.

## Security Note

When linking to external sites, always use `target='_blank'` and consider adding `rel='noopener'` to prevent security issues:

```json
"<a href='https://external-site.com' target='_blank' rel='noopener'>External Link</a>"
```

This prevents the external site from accessing your page's window object.

---

**Questions?** The link rendering is controlled by the `renderContent()` function in `app.js`. Links are styled in the CSS section of `index.html`.
