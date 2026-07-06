# API Documentation

## Base URL
```
http://localhost:3000/api
```

## Authentication
This API uses API key authentication via environment variables. Set `CLAUDE_API_KEY` in your `.env` file.

## Endpoints

### 1. Health Check
Check if the API is running.

**Endpoint:** `GET /api/health`

**Response:**
```json
{
  "status": "ok",
  "message": "Social Media Design AI API is running"
}
```

---

### 2. Generate Design
Generate a complete social media design based on business type and platform.

**Endpoint:** `POST /api/design/generate`

**Request Body:**
```json
{
  "businessType": "string (required)",
  "businessDescription": "string (optional)",
  "targetAudience": "string (optional)",
  "platform": "string (required) - instagram|facebook|linkedin|twitter|tiktok|pinterest|youtube",
  "postType": "string (optional) - feed-post|story|carousel|advertisement|banner|promo",
  "brandColors": ["string", "string", "string"] (optional - hex colors),
  "style": "string (optional) - modern|minimalist|playful|professional|vibrant"
}
```

**Example Request:**
```bash
curl -X POST http://localhost:3000/api/design/generate \
  -H "Content-Type: application/json" \
  -d '{
    "businessType": "E-commerce Fashion",
    "businessDescription": "Selling sustainable clothing",
    "targetAudience": "Eco-conscious millennials",
    "platform": "instagram",
    "postType": "feed-post",
    "brandColors": ["#2ECC71", "#27AE60", "#16A085"],
    "style": "modern"
  }'
```

**Response:**
```json
{
  "design": {
    "html": "<!DOCTYPE html>...",
    "css": "body { ... }",
    "colorPalette": ["#2ECC71", "#27AE60", "#16A085", "#3498db", "#e74c3c"],
    "typography": {
      "primaryFont": "Inter, sans-serif",
      "secondaryFont": "Poppins, sans-serif",
      "headingSize": "48px",
      "bodySize": "16px",
      "fontPairings": "Modern and clean typography combination"
    },
    "recommendations": "Design optimized for maximum engagement"
  },
  "analysis": {
    "businessInsights": "Fashion e-commerce targeting eco-conscious consumers...",
    "suggestedStyle": "modern",
    "keyMessages": ["Sustainable fashion", "Quality fabrics", "Ethical production"],
    "designStrategy": "Modern, clean design with earth tones..."
  },
  "metadata": {
    "businessType": "E-commerce Fashion",
    "platform": "instagram",
    "postType": "feed-post",
    "generatedAt": "2024-01-15T10:30:00Z"
  }
}
```

**Status Codes:**
- `200 OK` - Design generated successfully
- `400 Bad Request` - Missing required fields
- `500 Internal Server Error` - API error

---

### 3. Analyze Business
Analyze a business and get design recommendations without generating a full design.

**Endpoint:** `POST /api/design/analyze`

**Request Body:**
```json
{
  "businessType": "string (required)",
  "businessDescription": "string (optional)"
}
```

**Example Request:**
```bash
curl -X POST http://localhost:3000/api/design/analyze \
  -H "Content-Type: application/json" \
  -d '{
    "businessType": "Tech Startup",
    "businessDescription": "AI-powered project management tool"
  }'
```

**Response:**
```json
{
  "industry": "Technology / SaaS",
  "bestPlatforms": ["LinkedIn", "Twitter", "Product Hunt"],
  "suggestedColors": ["#3498db", "#2ecc71", "#e74c3c"],
  "suggestedStyle": "modern",
  "contentThemes": ["Product updates", "Industry insights", "Use cases", "Team culture"],
  "audienceInsights": "Tech-savvy professionals aged 25-45...",
  "designTips": [
    "Use clean, minimal design",
    "Emphasize innovation and efficiency",
    "Include data visualizations",
    "Show product in action"
  ],
  "engagementStrategies": [
    "Share thought leadership content",
    "Engage with industry discussions",
    "Showcase customer success stories",
    "Participate in tech communities"
  ]
}
```

**Status Codes:**
- `200 OK` - Analysis completed successfully
- `400 Bad Request` - Missing businessType
- `500 Internal Server Error` - API error

---

### 4. Generate Variations
Generate multiple design variations with different styles.

**Endpoint:** `POST /api/design/variations`

**Request Body:**
```json
{
  "businessType": "string (required)",
  "businessDescription": "string (optional)",
  "platform": "string (required)",
  "count": "number (optional, default: 3, max: 5)"
}
```

**Example Request:**
```bash
curl -X POST http://localhost:3000/api/design/variations \
  -H "Content-Type: application/json" \
  -d '{
    "businessType": "Coffee Shop",
    "businessDescription": "Specialty coffee and pastries",
    "platform": "instagram",
    "count": 3
  }'
```

**Response:**
```json
{
  "businessType": "Coffee Shop",
  "platform": "instagram",
  "variations": [
    {
      "style": "modern",
      "html": "<!DOCTYPE html>...",
      "generatedAt": "2024-01-15T10:35:00Z"
    },
    {
      "style": "minimalist",
      "html": "<!DOCTYPE html>...",
      "generatedAt": "2024-01-15T10:36:00Z"
    },
    {
      "style": "playful",
      "html": "<!DOCTYPE html>...",
      "generatedAt": "2024-01-15T10:37:00Z"
    }
  ],
  "count": 3
}
```

**Status Codes:**
- `200 OK` - Variations generated successfully
- `400 Bad Request` - Missing required fields
- `500 Internal Server Error` - API error

---

## Error Handling

All endpoints return errors in the following format:

```json
{
  "error": "Error category",
  "message": "Detailed error message"
}
```

**Common Errors:**

| Error | Cause | Solution |
|-------|-------|----------|
| Missing required fields | Request body incomplete | Check required fields |
| Claude API Error | Invalid API key or quota exceeded | Verify CLAUDE_API_KEY |
| Failed to generate design | API timeout or error | Retry or check error details |
| Internal server error | Unexpected error | Check server logs |

---

## Request/Response Examples

### Full Design Generation Example

**Request:**
```bash
curl -X POST http://localhost:3000/api/design/generate \
  -H "Content-Type: application/json" \
  -d '{
    "businessType": "Fitness Studio",
    "businessDescription": "High-intensity interval training classes",
    "targetAudience": "Busy professionals aged 25-40",
    "platform": "facebook",
    "postType": "advertisement",
    "brandColors": ["#FF6B6B", "#4ECDC4"],
    "style": "vibrant"
  }'
```

**Response (abbreviated):**
```json
{
  "design": {
    "html": "<!DOCTYPE html>\n<html lang=\"en\">\n<head>...",
    "colorPalette": ["#FF6B6B", "#4ECDC4", "#95E1D3", "#F38181"],
    "typography": {
      "primaryFont": "Montserrat, sans-serif",
      "secondaryFont": "Open Sans, sans-serif"
    },
    "recommendations": "Vibrant, energetic design highlighting fitness benefits..."
  },
  "analysis": {
    "businessInsights": "Fitness studio targeting busy professionals...",
    "suggestedStyle": "vibrant"
  },
  "metadata": {
    "businessType": "Fitness Studio",
    "platform": "facebook",
    "generatedAt": "2024-01-15T10:45:00Z"
  }
}
```

---

## Rate Limiting

No explicit rate limits are enforced on the API, but be mindful of:
- Claude API usage limits
- Your API quota
- Concurrent request handling

For production use, consider implementing rate limiting.

---

## CORS Configuration

The API is configured to accept requests from:
- `http://localhost:8000`
- `http://localhost:3000`
- `http://127.0.0.1:8000`

To add more origins, modify `backend/server.js`:

```javascript
app.use(cors({
  origin: ['http://localhost:8000', 'your-domain.com'],
  credentials: true
}));
```

---

## Performance Notes

- Design generation typically takes 10-30 seconds
- Variations generation is slower (30-90 seconds for 3+ variations)
- API responses are streaming from Claude
- Keep-alive connections recommended for multiple requests

---

## Integration Examples

### JavaScript/Fetch
```javascript
const response = await fetch('http://localhost:3000/api/design/generate', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    businessType: 'Coffee Shop',
    platform: 'instagram',
    style: 'modern'
  })
});
const data = await response.json();
```

### Python/Requests
```python
import requests

response = requests.post(
  'http://localhost:3000/api/design/generate',
  json={
    'businessType': 'Coffee Shop',
    'platform': 'instagram',
    'style': 'modern'
  }
)
design = response.json()
```

### cURL
```bash
curl -X POST http://localhost:3000/api/design/generate \
  -H "Content-Type: application/json" \
  -d '{"businessType":"Coffee Shop","platform":"instagram"}'
```

---

## Webhook Support (Future)

Webhooks for design generation completion are planned for v2.0.

---

## Support

For API issues:
1. Check the error message
2. Verify your API key
3. Review server logs
4. Check Claude API status
5. Refer to the README.md

---

## Version History

- **v1.0** (2024-01-15) - Initial release with 4 endpoints
- **v2.0** (Planned) - Webhook support, batch operations, webhooks
- **v3.0** (Planned) - Custom templates, design history, collaboration features
