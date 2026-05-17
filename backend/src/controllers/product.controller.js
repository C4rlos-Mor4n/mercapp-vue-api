import * as productService from '../services/product.service.js';
import { validateProduct } from '../validators/product.validator.js';

export async function getAll(req, res, next) {
  try {
    const products = await productService.getAll();
    res.json({ success: true, data: products });
  } catch (err) { next(err); }
}

export async function getById(req, res, next) {
  try {
    const product = await productService.getById(req.params.id);
    if (!product) return res.status(404).json({ success: false, message: 'Producto no encontrado', errors: [] });
    res.json({ success: true, data: product });
  } catch (err) { next(err); }
}

export async function create(req, res, next) {
  try {
    const errors = await validateProduct(req.body);
    if (errors.length > 0) return res.status(400).json({ success: false, message: 'Datos inválidos', errors });
    const product = await productService.create(req.body);
    res.status(201).json({ success: true, data: product });
  } catch (err) { next(err); }
}

export async function update(req, res, next) {
  try {
    const errors = await validateProduct(req.body, true);
    if (errors.length > 0) return res.status(400).json({ success: false, message: 'Datos inválidos', errors });
    const product = await productService.update(req.params.id, req.body);
    if (!product) return res.status(404).json({ success: false, message: 'Producto no encontrado', errors: [] });
    res.json({ success: true, data: product });
  } catch (err) { next(err); }
}

export async function patch(req, res, next) {
  try {
    const errors = await validateProduct(req.body, true);
    if (errors.length > 0) return res.status(400).json({ success: false, message: 'Datos inválidos', errors });
    const product = await productService.update(req.params.id, req.body);
    if (!product) return res.status(404).json({ success: false, message: 'Producto no encontrado', errors: [] });
    res.json({ success: true, data: product });
  } catch (err) { next(err); }
}

export async function remove(req, res, next) {
  try {
    const deleted = await productService.remove(req.params.id);
    if (!deleted) return res.status(404).json({ success: false, message: 'Producto no encontrado', errors: [] });
    res.json({ success: true, data: { message: 'Producto eliminado correctamente' } });
  } catch (err) { next(err); }
}
