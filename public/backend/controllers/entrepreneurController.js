
const EntrepreneurProfile = require("../models/EntrepreneurProfile");



const listEntrepreneurs = async (req, res) => {
  try {
    const entrepreneurs = await EntrepreneurProfile.findAll();
    res.status(200).json(entrepreneurs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Define all functions first
const createEntrepreneurProfile = async (req, res) => {
  try {
    const profile = await EntrepreneurProfile.create({ ...req.body, userId: req.user.id });
    res.status(201).json(profile);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getEntrepreneurProjects = async (req, res) => {
  try {
    const projects = await EntrepreneurProfile.findAll({ where: { userId: req.user.id } });
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getProfile = async (req, res) => {
  try {
    const profile = await EntrepreneurProfile.findOne({ where: { userId: req.user.id } });
    if (!profile) {
      return res.status(404).json({ error: "Profile not found" });
    }
    res.status(200).json(profile);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateProfile = async (req, res) => {
  try {
    const profile = await EntrepreneurProfile.findOne({ where: { userId: req.user.id } });
    if (!profile) {
      return res.status(404).json({ error: "Profile not found" });
    }
    await profile.update(req.body);
    res.status(200).json(profile);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Export all functions
module.exports = {
    listEntrepreneurs,
  createEntrepreneurProfile,
  getEntrepreneurProjects,
  getProfile,
  updateProfile
};