import { Router } from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/user';

const router = Router();

// Sign Up
router.post('/signup', async (req, res) => {
  const { username, password, role, adminId } = req.body;
  if (role === 'admin' && adminId !== 'SPECIAL_ADMIN_ID') {
    return res.status(403).json({ message: 'Invalid admin ID' });
  }
  // Check for existing user
  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return res.status(409).json({ message: 'Username already exists' });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const user = new User({ username, password: hashedPassword, role, adminId });
    await user.save();
    res.status(201).json({ message: 'User created' });
  } catch (err) {
    res.status(400).json({ message: 'User creation failed', error: err });
  }
});

// Login
router.post('/login', async (req, res) => {
  const { username, password, role, adminId } = req.body;
  const user = await User.findOne({ username, role, ...(role === 'admin' ? { adminId } : {}) });
  if (!user) return res.status(404).json({ message: 'User not found' });
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(401).json({ message: 'Invalid password' });
  res.json({ message: 'Login successful', user: { username: user.username, role: user.role } });
});

export default router;