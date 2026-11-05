const express = require('express');
const router = express.Router();
const Portfolio = require('../models/Portfolio');
const authMiddleware = require('../middleware/auth');

const ALLOWED_SECTIONS = [
  'personal', 'contact', 'social', 'about',
  'skills', 'services', 'experience', 'education',
  'projects', 'certificates', 'theme', 'seo'
];

// GET /api/portfolio — Public: get all data
router.get('/', async (req, res) => {
  try {
    let portfolio = await Portfolio.findOne();
    if (!portfolio) {
      portfolio = await Portfolio.create({});
    }
    res.json(portfolio);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// PUT /api/portfolio/:section — Admin only: update a section
router.put('/:section', authMiddleware, async (req, res) => {
  const { section } = req.params;

  if (!ALLOWED_SECTIONS.includes(section)) {
    return res.status(400).json({ message: `Invalid section: "${section}"` });
  }

  try {
    let portfolio = await Portfolio.findOne();
    if (!portfolio) {
      portfolio = await Portfolio.create({});
    }

    portfolio[section] = req.body;
    portfolio.markModified(section);
    await portfolio.save();

    res.json({ message: `✅ "${section}" updated successfully.`, data: portfolio[section] });
  } catch (err) {
    res.status(500).json({ message: 'Update failed', error: err.message });
  }
});

// PUT /api/portfolio — Admin only: update ALL data at once
router.put('/', authMiddleware, async (req, res) => {
  try {
    let portfolio = await Portfolio.findOne();
    if (!portfolio) {
      portfolio = new Portfolio(req.body);
    } else {
      Object.assign(portfolio, req.body);
      ALLOWED_SECTIONS.forEach(s => portfolio.markModified(s));
    }
    await portfolio.save();
    res.json({ message: '✅ Portfolio updated.', data: portfolio });
  } catch (err) {
    res.status(500).json({ message: 'Update failed', error: err.message });
  }
});

module.exports = router;
