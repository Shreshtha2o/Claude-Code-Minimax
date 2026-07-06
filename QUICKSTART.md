# Quick Start Guide

## Installation & Setup

### 1. Prerequisites
Before getting started, ensure you have:
- **Node.js** (v14+) - [Download](https://nodejs.org)
- **Python 3** (for serving frontend) - [Download](https://python.org)
- **Claude API Key** - [Get one](https://console.anthropic.com)

### 2. Clone/Extract Project
```bash
cd social-media-design-ai
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Configure API Key
```bash
# Copy the example environment file
cp .env.example .env

# Edit .env and add your CLAUDE_API_KEY
# Windows (notepad):
notepad .env

# Mac/Linux (nano):
nano .env
```

Add your key:
```
CLAUDE_API_KEY=sk-ant-xxxxxxxxxxxxxxx
PORT=3000
NODE_ENV=development
```

## Running the Application

### Terminal 1 - Start Backend
```bash
npm start
# or for development with auto-reload:
npm run dev
```

Expected output:
```
🚀 Social Media Design AI Server running on http://localhost:3000
Environment: development
API Key configured: ✓
```

### Terminal 2 - Start Frontend (from project root)
```bash
npm run frontend
```

Or manually:
```bash
cd frontend
python -m http.server 8000
```

### 3. Open in Browser
Visit: **http://localhost:8000**

## First Time Usage

### Step 1: Enter Business Information
1. Business Type: "Coffee Shop" or "Tech Startup"
2. Description: Brief details about the business
3. Target Audience: Who you're trying to reach
4. Brand Colors (optional): Your brand colors

### Step 2: Select Platform & Style
- Choose social media platform (Instagram, Facebook, etc.)
- Select post type (Feed Post, Story, Ad, etc.)
- Pick design style (Modern, Minimalist, Playful, etc.)

### Step 3: Generate Design
Click "Generate Design" and wait for AI to create:
- Complete HTML/CSS code
- Design recommendations
- Color palette
- Typography suggestions

### Step 4: Preview & Export
- View design in the Preview tab
- Copy code from Code tab
- Download as HTML file
- Share or modify further

## Common Issues & Solutions

### Issue: "Backend not connected"
**Solution:**
- Make sure backend is running: `npm start`
- Check port 3000 is not in use
- Verify CLAUDE_API_KEY is set in .env

### Issue: CORS errors in console
**Solution:**
- Backend must be running on port 3000
- Frontend must be on port 8000
- CORS is pre-configured

### Issue: Design generation fails
**Solution:**
- Check API key validity
- Ensure you have API quota
- Check browser console for error details
- Verify network connection

### Issue: "Python not found"
**Solution:**
```bash
# Use Node's built-in server instead:
cd frontend
npx http-server
# Then visit http://localhost:8080
```

## API Endpoints

### Generate Design
```bash
POST http://localhost:3000/api/design/generate

{
  "businessType": "E-commerce Fashion",
  "businessDescription": "Sustainable clothing",
  "targetAudience": "Eco-conscious millennials",
  "platform": "instagram",
  "postType": "feed-post",
  "brandColors": ["#2ECC71", "#27AE60"],
  "style": "modern"
}
```

### Analyze Business
```bash
POST http://localhost:3000/api/design/analyze

{
  "businessType": "Coffee Shop",
  "businessDescription": "Specialty coffee and pastries"
}
```

### Generate Variations
```bash
POST http://localhost:3000/api/design/variations

{
  "businessType": "Fashion Brand",
  "businessDescription": "Modern clothing",
  "platform": "instagram",
  "count": 3
}
```

## Project Structure

```
social-media-design-ai/
├── backend/
│   ├── server.js                 # Main server
│   ├── routes/design.js          # API routes
│   ├── controllers/
│   │   └── designController.js   # Business logic
│   └── config/
│       └── claude.js             # API config
├── frontend/
│   ├── index.html                # UI
│   ├── styles/style.css          # Styles
│   └── scripts/app.js            # Logic
├── prompts/                      # AI prompts
└── package.json                  # Dependencies
```

## Features

✅ AI-powered design generation
✅ Multi-platform support
✅ Customizable colors & styles
✅ Real-time preview
✅ HTML/CSS export
✅ Business analysis
✅ Design variations
✅ Responsive designs
✅ Mobile-optimized

## Tips for Best Results

### Business Type Tips
Be specific: "Vegan Bakery" → better than "Food Business"

### Description Tips
- Include key differentiators
- Mention unique products/services
- Highlight target market focus

### Color Tips
- Use brand colors if you have them
- Otherwise, colors will be recommended
- AI will harmonize colors naturally

### Platform Tips
- Consider platform dimensions
- Match content to platform culture
- Use platform-specific features

### Style Tips
- Match to brand personality
- Consider audience preferences
- Ensure readability

## Advanced Usage

### Batch Design Generation
Create multiple designs in sequence:
1. Analyze business first
2. Generate multiple variations
3. Export preferred designs

### Design Customization
After generating:
1. Copy HTML code
2. Edit in your preferred editor
3. Customize colors, text, images
4. Preview in browser

### Integration with Your Stack
Export HTML and:
- Embed in WordPress
- Add to Shopify store
- Integrate with email campaigns
- Use with social scheduling tools

## Environment Variables

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| CLAUDE_API_KEY | Yes | - | Your Anthropic API key |
| PORT | No | 3000 | Backend server port |
| NODE_ENV | No | development | Environment mode |

## Performance Tips

- Designs typically generate in 10-30 seconds
- Disable auto-refresh while generating
- Close unused browser tabs
- Clear browser cache if issues occur

## Next Steps

1. **Generate your first design** - Pick any business type
2. **Try different styles** - Experiment with Modern, Playful, Professional
3. **Export and customize** - Download HTML and make it yours
4. **Share with team** - Get feedback on variations
5. **Integrate into workflow** - Use with design tools or CMS

## Support & Resources

- Check error messages in browser console
- Review API logs in terminal
- Consult Claude AI documentation
- Review prompt examples in `/prompts` folder

## License

MIT License - Use freely in personal and commercial projects

## Version

Social Media Design AI v1.0
Built with Node.js, Express, and Claude API

---

**Questions?** Check the detailed README.md or review the code comments for more information.
