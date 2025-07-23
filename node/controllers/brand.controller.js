import { BrandModel } from '../models/brand.model.js';
import {
  brandIdSchema,
  brandQuerySchema,
  createBrandSchema,
} from '../validators/brand.validator.js';

export const createBrand = async (req, res) => {
  const validateData = createBrandSchema.safeParse(req.body);

  if (!validateData.success) {
    return res.status(400).json({ errors: validateData.error.errors });
  }

  const { name, description, logoUrl } = validateData.data;

  const existingBrand = await BrandModel.findOne({ name });
  if (existingBrand) return res.status(400).json({ error: 'Brand already exists' });

  try {
    const newBrand = new BrandModel({ name, description, logoUrl });
    await newBrand.save();

    res.status(201).json({
      brand: newBrand,
      message: 'Brand created successfully!',
    });
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export const getBrands = async (req, res) => {
  const validateQuery = brandQuerySchema.safeParse(req.query);

  if (!validateQuery.success) {
    return res.status(400).json({ errors: validateQuery.error.errors });
  }

  const {
    page = 1,
    limit = 10,
    sortBy = 'createdAt',
    sortOrder = 'desc',
    search,
  } = validateQuery.data;

  const skip = (page - 1) * limit;
  const sortDirection = sortOrder === 'asc' ? 1 : -1;

  const filter = {};
  if (search) {
    filter.name = { $regex: search, $options: 'i' };
  }

  try {
    const [brands, total] = await Promise.all([
      BrandModel.find(filter)
        .sort({ [sortBy]: sortDirection })
        .skip(skip)
        .limit(limit),
      BrandModel.countDocuments(filter),
    ]);

    res.status(200).json({
      data: brands,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export const getBrandById = async (req, res) => {
  const validateQuery = brandIdSchema.safeParse(req.params);

  if (!validateQuery.success) {
    return res.status(400).json({ errors: validateQuery.error.errors });
  }

  const { id } = validateQuery.data;

  try {
    const brand = await BrandModel.findById(id);

    if (!brand) {
      return res.status(404).json({ error: 'Brand not found' });
    }

    res.status(200).json({ brand });
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export const updateBrand = async (req, res) => {
  const validateQuery = brandIdSchema.safeParse(req.params);
  const validateData = createBrandSchema.safeParse(req.body);

  if (!validateData.success) {
    return res.status(400).json({ errors: validateData.error.errors });
  }

  if (!validateQuery.success) {
    return res.status(400).json({ errors: validateQuery.error.errors });
  }

  const { id } = validateQuery.data;
  const { name, description, logoUrl } = validateData.data;

  const existingBrand = await BrandModel.findOne({ name });
  if (existingBrand) return res.status(400).json({ error: 'Brand already exists' });

  try {
    const updatedBrand = await BrandModel.findByIdAndUpdate(
      id,
      { name, description, logoUrl },
      { new: true },
    );

    if (!updatedBrand) {
      return res.status(404).json({ error: 'Brand not found' });
    }

    res.status(200).json({
      brand: updatedBrand,
      message: 'Brand updated successfully!',
    });
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export const deleteBrand = async (req, res) => {
  const validateQuery = brandIdSchema.safeParse(req.params);

  if (!validateQuery.success) {
    return res.status(400).json({ errors: validateQuery.error.errors });
  }

  const { id } = validateQuery.data;

  try {
    const deletedBrand = await BrandModel.findByIdAndDelete(id);

    if (!deletedBrand) {
      return res.status(404).json({ error: 'Brand not found' });
    }

    res.status(200).json({
      message: 'Brand deleted successfully!',
    });
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};
