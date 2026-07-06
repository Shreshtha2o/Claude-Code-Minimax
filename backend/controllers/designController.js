const { callClaude } = require('../config/claude');

/**
 * Generate a design based on business type and requirements
 */
async function generateDesign(req, res) {
  try {
    const {
      businessType,
      businessDescription,
      targetAudience,
      platform,
      postType,
      brandColors,
      style
    } = req.body;

    // Validate required fields
    if (!businessType || !platform) {
      return res.status(400).json({
        error: 'Missing required fields: businessType and platform'
      });
    }

    console.log('Generating design for:', {
      businessType,
      platform,
      postType
    });

    // Step 1: Analyze business and get recommendations
    const analysisPrompt = `You are a professional social media design expert. Analyze this business and provide design recommendations.

Business Type: ${businessType}
Description: ${businessDescription || 'Not provided'}
Target Audience: ${targetAudience || 'Not specified'}
Brand Colors: ${brandColors?.join(', ') || 'Not specified'}

Provide your analysis in JSON format with these fields:
{
  "businessInsights": "key insights about the business",
  "suggestedColors": ["color1", "color2", "color3"],
  "suggestedStyle": "modern|minimalist|playful|professional|vibrant",
  "keyMessages": ["message1", "message2"],
  "designStrategy": "specific design approach recommendations"
}`;

    const analysisResponse = await callClaude([
      { role: 'user', content: analysisPrompt }
    ]);

    let analysis;
    try {
      analysis = JSON.parse(analysisResponse);
    } catch (e) {
      // Extract JSON from response if it's wrapped in markdown
      const jsonMatch = analysisResponse.match(/\{[\s\S]*\}/);
      analysis = jsonMatch ? JSON.parse(jsonMatch[0]) : {};
    }

    // Step 2: Generate HTML/CSS design
    const designPrompt = `You are a world-class web designer and social media expert. Create a stunning HTML/CSS design for a ${platform} post.

Business: ${businessType}
Style: ${style || analysis.suggestedStyle || 'modern'}
Colors to use: ${analysis.suggestedColors?.join(', ') || brandColors?.join(', ') || '#3498db, #2ecc71, #e74c3c'}
Platform: ${platform}
Post Type: ${postType || 'feed-post'}

Requirements:
1. Create responsive HTML/CSS code
2. Use modern design principles
3. Incorporate the provided colors naturally
4. Make it visually appealing and professional
5. Include relevant content for the business
6. Ensure mobile responsiveness

Provide ONLY the complete HTML code with embedded CSS in <style> tags. Start with <!DOCTYPE html> and include everything needed to display standalone. Make it production-ready.`;

    const designResponse = await callClaude([
      { role: 'user', content: designPrompt }
    ], 3000, 0.8);

    // Step 3: Generate typography and layout recommendations
    const typographyPrompt = `Based on this ${businessType} business and ${platform} platform, suggest typography and layout best practices.

Response format as JSON:
{
  "typography": {
    "primaryFont": "font recommendation",
    "secondaryFont": "font recommendation",
    "headingSize": "size in pixels",
    "bodySize": "size in pixels",
    "fontPairings": "why these fonts work together"
  },
  "layout": {
    "gridType": "type of grid system",
    "spacing": "spacing principles",
    "keyElements": ["list of key design elements"],
    "compositionTip": "specific composition advice"
  },
  "tips": ["tip1", "tip2", "tip3"]
}`;

    const typographyResponse = await callClaude([
      { role: 'user', content: typographyPrompt }
    ]);

    let typography;
    try {
      typography = JSON.parse(typographyResponse);
    } catch (e) {
      const jsonMatch = typographyResponse.match(/\{[\s\S]*\}/);
      typography = jsonMatch ? JSON.parse(jsonMatch[0]) : {};
    }

    // Compile response
    const designData = {
      design: {
        html: designResponse,
        colorPalette: analysis.suggestedColors || brandColors || ['#3498db', '#2ecc71', '#e74c3c', '#f39c12', '#9b59b6'],
        typography: typography,
        recommendations: analysis.designStrategy || 'Design optimized for maximum engagement'
      },
      analysis: {
        businessInsights: analysis.businessInsights || 'Design tailored to business needs',
        suggestedStyle: analysis.suggestedStyle || 'modern',
        keyMessages: analysis.keyMessages || [],
        designStrategy: analysis.designStrategy || ''
      },
      metadata: {
        businessType,
        platform,
        postType,
        generatedAt: new Date().toISOString()
      }
    };

    res.json(designData);
  } catch (error) {
    console.error('Design generation error:', error);
    res.status(500).json({
      error: 'Failed to generate design',
      message: error.message
    });
  }
}

/**
 * Analyze business and return insights
 */
async function analyzeBusiness(req, res) {
  try {
    const { businessType, businessDescription } = req.body;

    if (!businessType) {
      return res.status(400).json({
        error: 'businessType is required'
      });
    }

    const prompt = `Analyze this business for social media marketing:

Business Type: ${businessType}
${businessDescription ? `Description: ${businessDescription}` : ''}

Provide analysis in JSON format:
{
  "industry": "industry category",
  "bestPlatforms": ["platform1", "platform2"],
  "suggestedColors": ["color1", "color2", "color3"],
  "suggestedStyle": "design style",
  "contentThemes": ["theme1", "theme2"],
  "audienceInsights": "description of target audience",
  "designTips": ["tip1", "tip2"],
  "engagementStrategies": ["strategy1", "strategy2"]
}`;

    const response = await callClaude([
      { role: 'user', content: prompt }
    ]);

    let analysis;
    try {
      analysis = JSON.parse(response);
    } catch (e) {
      const jsonMatch = response.match(/\{[\s\S]*\}/);
      analysis = jsonMatch ? JSON.parse(jsonMatch[0]) : {};
    }

    res.json(analysis);
  } catch (error) {
    console.error('Business analysis error:', error);
    res.status(500).json({
      error: 'Failed to analyze business',
      message: error.message
    });
  }
}

/**
 * Generate multiple design variations
 */
async function generateVariations(req, res) {
  try {
    const {
      businessType,
      businessDescription,
      platform,
      count = 3
    } = req.body;

    if (!businessType || !platform) {
      return res.status(400).json({
        error: 'Missing required fields'
      });
    }

    const variations = [];

    const styles = ['modern', 'minimalist', 'playful', 'professional', 'vibrant'];
    const selectedStyles = styles.slice(0, Math.min(count, styles.length));

    for (const style of selectedStyles) {
      const prompt = `Create a unique ${style} style HTML design for a ${platform} post for a ${businessType} business.

Requirements:
1. Different visual approach for each style
2. Professional and modern
3. Responsive design
4. Production-ready code

Provide only the complete HTML code with embedded CSS.`;

      try {
        const design = await callClaude([
          { role: 'user', content: prompt }
        ], 2500, 0.8);

        variations.push({
          style,
          html: design,
          generatedAt: new Date().toISOString()
        });
      } catch (error) {
        console.error(`Error generating ${style} variation:`, error.message);
      }
    }

    res.json({
      businessType,
      platform,
      variations,
      count: variations.length
    });
  } catch (error) {
    console.error('Variations generation error:', error);
    res.status(500).json({
      error: 'Failed to generate variations',
      message: error.message
    });
  }
}

module.exports = {
  generateDesign,
  analyzeBusiness,
  generateVariations
};
