# Social Media Design AI

An AI-powered platform that generates customized social media post designs based on your business type using Claude AI.

## Features

- **Business Type Analysis**: Input your business type and get tailored design recommendations
- **AI-Generated Designs**: Uses Claude AI to generate complete HTML/CSS design templates
- **Multiple Platforms**: Supports designs for Instagram, Facebook, Twitter, LinkedIn, TikTok, and more
- **Customizable Designs**: Get color palettes, typography, layout suggestions, and code
- **Real-time Generation**: Fast design generation with streaming responses
- **Design Preview**: See generated designs in real-time with responsive preview

## Project Structure

```
social-media-design-ai/
├── backend/                    # Node.js/Express backend
│   ├── server.js              # Main server file
│   ├── routes/
│   │   └── design.js          # Design generation routes
│   ├── controllers/
│   │   └── designController.js # Business logic
│   └── config/
│       └── claude.js          # Claude API configuration
├── frontend/                   # HTML/CSS/JavaScript frontend
│   ├── index.html             # Main UI
│   ├── styles/
│   │   └── style.css          # Styling
│   └── scripts/
│       └── app.js             # Frontend logic
├── prompts/                    # AI prompts
│   ├── design-generator.md    # Design generation prompts
│   ├── business-analyzer.md   # Business analysis prompts
│   └── color-palette.md       # Color palette generation prompts
├── .env.example               # Environment template
├── package.json               # Dependencies
└── README.md                  # Documentation
```

## Installation

### Prerequisites
- Node.js (v14 or higher)
- Python 3 (for serving frontend)
- Anthropic API Key

### Setup

1. **Clone or extract the project**
   ```bash
   cd social-media-design-ai
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment**
   ```bash
   cp .env.example .env
   # Edit .env and add your CLAUDE_API_KEY
   ```

## Running the Application

### Start Backend Server
```bash
npm start
# or for development with auto-reload
npm run dev
```

The backend will run on `http://localhost:3000`

### Start Frontend (in another terminal)
```bash
npm run frontend
```

The frontend will run on `http://localhost:8000`

Visit `http://localhost:8000` in your browser.

## Usage

1. **Enter Your Business Details**
   - Business Type (e.g., "E-commerce Fashion", "Tech Startup", "Coffee Shop")
   - Business Description
   - Target Audience
   - Brand Colors (optional)

2. **Select Platform**
   - Choose which social media platform (Instagram, Facebook, LinkedIn, etc.)
   - Specify post type (Banner, Story, Carousel, etc.)

3. **Generate Design**
   - Click "Generate Design"
   - AI will analyze your business and create:
     - Design recommendations
     - HTML/CSS code
     - Color palette suggestions
     - Typography recommendations
     - Layout suggestions

4. **Customize & Download**
   - Preview the design in real-time
   - Copy HTML/CSS code
   - Download as HTML file
   - Export as image (future feature)

## API Endpoints

### POST `/api/design/generate`
Generate a design based on business type

**Request:**
```json
{
  "businessType": "E-commerce Fashion",
  "businessDescription": "Selling sustainable clothing",
  "targetAudience": "Eco-conscious millennials",
  "platform": "instagram",
  "postType": "feed-post",
  "brandColors": ["#2ECC71", "#27AE60"],
  "style": "modern"
}
```

**Response:**
```json
{
  "design": {
    "html": "<div>...</div>",
    "css": "body { ... }",
    "colorPalette": [...],
    "typography": {...},
    "recommendations": "..."
  },
  "analysis": {
    "businessInsights": "...",
    "designStrategy": "..."
  }
}
```

### POST `/api/design/analyze-business`
Analyze business and get recommendations

**Request:**
```json
{
  "businessType": "E-commerce Fashion",
  "businessDescription": "Selling sustainable clothing"
}
```

**Response:**
```json
{
  "insights": "...",
  "suggestedColors": [...],
  "suggestedStyle": "...",
  "targetAudienceInsights": "..."
}
```

## Environment Variables

```
CLAUDE_API_KEY=your-anthropic-api-key
PORT=3000
NODE_ENV=development
```

## Technology Stack

### Backend
- **Express.js** - Web framework
- **Anthropic Claude API** - AI for design generation
- **Node.js** - Runtime

### Frontend
- **HTML5** - Structure
- **CSS3** - Styling & animations
- **Vanilla JavaScript** - Interactivity
- **Fetch API** - Backend communication

## Design Generation Process

1. **Business Analysis Phase**
   - Analyzes business type and description
   - Identifies target audience
   - Determines design needs

2. **Design Strategy Phase**
   - Creates color palette recommendations
   - Suggests typography
   - Recommends layout approaches

3. **Code Generation Phase**
   - Generates responsive HTML
   - Creates styled CSS
   - Produces production-ready code

4. **Optimization Phase**
   - Ensures mobile responsiveness
   - Optimizes for the platform
   - Adds accessibility features

## Supported Business Types

- E-commerce (Fashion, Electronics, Food)
- Technology (SaaS, Hardware, AI)
- Services (Photography, Consulting, Beauty)
- Lifestyle (Fitness, Travel, Wellness)
- Food & Beverage (Restaurants, Cafes, Bakeries)
- Real Estate
- Education
- Healthcare
- Entertainment
- Financial Services

## Supported Platforms

- Instagram (Feed, Stories, Reels)
- Facebook (Feed, Stories, Ads)
- LinkedIn (Posts, Ads, Banner)
- Twitter/X (Posts, Promoted)
- TikTok (Videos, Posts)
- Pinterest (Pins, Ads)
- YouTube (Thumbnails, Banners)

## Future Enhancements

- [ ] Image upload and style transfer
- [ ] Multiple design variations
- [ ] A/B testing recommendations
- [ ] Analytics dashboard
- [ ] Team collaboration features
- [ ] Design templates library
- [ ] Brand kit management
- [ ] Scheduled posting
- [ ] Image export (PNG/JPG)
- [ ] Video design generation

## Troubleshooting

### Backend not connecting
- Ensure `CLAUDE_API_KEY` is set correctly in `.env`
- Check that port 3000 is not in use
- Verify Node.js is installed

### CORS errors
- Ensure backend is running on port 3000
- Check that frontend is on port 8000
- CORS is configured in server.js

### Design generation fails
- Verify API key validity
- Check API quota
- Review error messages in browser console

## License

MIT

## Support

For issues or questions, please check the documentation or review the code comments.

## Contributing

Contributions welcome! Please ensure code follows the existing style.

