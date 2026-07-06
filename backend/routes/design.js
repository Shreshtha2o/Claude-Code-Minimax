const express = require('express');
const router = express.Router();
const {
  generateDesign,
  analyzeBusiness,
  generateVariations
} = require('../controllers/designController');

/**
 * POST /api/design/generate
 * Generate a design based on business type and requirements
 */
router.post('/generate', generateDesign);

/**
 * POST /api/design/analyze
 * Analyze business and return insights
 */
router.post('/analyze', analyzeBusiness);

/**
 * POST /api/design/variations
 * Generate multiple design variations
 */
router.post('/variations', generateVariations);

module.exports = router;
