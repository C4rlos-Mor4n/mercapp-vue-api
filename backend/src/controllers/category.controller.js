import * as categoryService from '../services/category.service.js';

export async function getAll(req, res, next) {
  try {
    const categories = await categoryService.getAll();
    res.json({ success: true, data: categories });
  } catch (err) { next(err); }
}
