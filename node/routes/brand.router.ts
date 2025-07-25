import express from 'express';
import { BrandController } from '../controllers/index';

const router = express.Router();

router.post('/', BrandController.createBrand);
router.get('/', BrandController.getBrands);
router.get('/:id', BrandController.getBrandById);
router.patch('/:id', BrandController.updateBrand);
router.delete('/:id', BrandController.deleteBrand);

export default router;
