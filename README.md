# Aquavx Pro User Guide Website

A modern, responsive online version of the Aquavx Pro user manual with search functionality and easy navigation.

## Features

- **Clean, Modern Design**: Professional interface with intuitive navigation
- **Full-Text Search**: Search across all sections and subsections with highlighted results
- **Responsive Layout**: Works on desktop, tablet, and mobile devices
- **Keyboard Navigation**: Use arrow keys to navigate between sections
- **Sidebar Navigation**: Quick access to all sections and subsections
- **Paginated Content**: Each major section on its own page for easy reading

## Files Included

- `index.html` - Main HTML file
- `app.js` - JavaScript application logic
- `content.json` - Structured content extracted from the user manual

## Deployment Options

### Option 1: Simple Static Hosting (Recommended)

Upload all three files to any static hosting service:

1. **GitHub Pages** (Free)
   - Create a GitHub repository
   - Upload the three files
   - Enable GitHub Pages in repository settings
   - Access via `https://yourusername.github.io/repository-name`

2. **Netlify** (Free)
   - Sign up at netlify.com
   - Drag and drop the folder containing all three files
   - Get instant deployment with a custom URL
   - Optional: Connect a custom domain

3. **Vercel** (Free)
   - Sign up at vercel.com
   - Import the files via their dashboard
   - Automatic deployment and custom domain support

4. **AWS S3** (Low cost)
   - Create an S3 bucket
   - Enable static website hosting
   - Upload all three files
   - Set bucket policy for public read access

### Option 2: Web Server

If you have a web server (Apache, Nginx, etc.):

1. Upload all three files to your web server's document root
2. Ensure the server is configured to serve `.json` files
3. Access via your domain or server IP

### Option 3: Local Testing

To test locally:

1. Install a simple HTTP server (Python, Node.js, etc.)
2. Using Python 3: `python3 -m http.server 8000`
3. Open browser to `http://localhost:8000`

## Usage

- **Navigation**: Click sections in the sidebar or use Previous/Next buttons
- **Search**: Type in the search bar to find content across all sections
- **Keyboard Shortcuts**: 
  - Left Arrow: Previous section
  - Right Arrow: Next section

## Customization

### Colors

Edit the CSS variables in `index.html` to change the color scheme:

```css
:root {
    --primary-color: #2563eb;      /* Main theme color */
    --primary-dark: #1e40af;       /* Darker variant */
    --secondary-color: #64748b;    /* Secondary elements */
    --bg-light: #f8fafc;           /* Background */
    --bg-white: #ffffff;           /* Content background */
    --text-dark: #1e293b;          /* Main text */
    --text-light: #64748b;         /* Secondary text */
}
```

### Layout

Adjust layout dimensions in the CSS variables:

```css
--sidebar-width: 280px;   /* Width of navigation sidebar */
--header-height: 70px;     /* Height of top header bar */
```

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Notes

- All content is loaded from `content.json`
- No backend or database required
- Works entirely in the browser
- Fast and lightweight (~35KB total)

## Support

For questions about the Aquavx Pro device, refer to the official Cattron documentation.
