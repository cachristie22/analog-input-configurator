# Quick Start - Aquavx Pro Website

## 🚀 Deploy in 3 Steps

### Step 1: Get Your Files
Download these 3 files from the outputs folder:
- `index.html`
- `app.js`
- `content_updated.json`

### Step 2: Add Your Image (Optional)
Create folder structure:
```
your-website/
├── index.html
├── app.js
├── content_updated.json
└── images/
    └── aquavx_diagram_1.jpg  ← Add your wiring diagram here
```

### Step 3: Deploy
Upload all files to any web host. Done!

## 🔧 Test Locally First

```bash
# In your website folder, run:
python3 -m http.server 8000

# Open browser to:
http://localhost:8000
```

## 📋 Checklist Before Going Live

- [ ] All 3 core files uploaded
- [ ] Website loads in browser
- [ ] Search works (type something in search bar)
- [ ] Tables display properly
- [ ] Navigation works (click sections, use Previous/Next)
- [ ] Image added (or placeholder is acceptable)
- [ ] Mobile view works (test on phone)

## ❓ Quick Troubleshooting

**Nothing loads?**
- Make sure all 3 files are in the same folder
- Check that `content_updated.json` is loading (open browser console - F12)

**Image not showing?**
- Check the `images/` folder exists
- Verify filename is exactly `aquavx_diagram_1.jpg`
- Or update the URL in `content_updated.json`

**Search not working?**
- Make sure JavaScript is enabled
- Try a hard refresh (Ctrl+Shift+R or Cmd+Shift+R)

## 🎯 Free Hosting Options

### GitHub Pages (Easiest)
1. Create repo at github.com
2. Upload 3 files
3. Settings → Pages → Enable
4. Done! URL: `username.github.io/repo-name`

### Netlify (Fastest)
1. Sign up at netlify.com
2. Drag folder with files
3. Get instant URL
4. Optional: Add custom domain

## 💡 Pro Tips

- **Rename**: You can rename `index.html` to anything (e.g., `aquavx.html`)
- **Offline**: Works offline after first load
- **Print**: Use browser print to save sections as PDF
- **Bookmark**: Great for quick reference on mobile

## 📞 Need Help?

See full documentation:
- `README.md` - Complete deployment guide
- `IMAGE_GUIDE.md` - How to add/update images
- `UPDATE_SUMMARY.md` - What changed in this version

---

**That's it! Your site should be live in under 5 minutes.** 🎉
