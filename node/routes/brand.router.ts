import express from 'express';
import { BrandController } from '../controllers/index';
import { checkAuth } from '../middlewares/checkAuth';

const router = express.Router();

router.post('/', checkAuth, BrandController.createBrand);
router.get('/', BrandController.getBrands);
router.get('/:id', BrandController.getBrandById);
router.patch('/:id', checkAuth, BrandController.updateBrand);
router.delete('/:id', checkAuth, BrandController.deleteBrand);

export default router;
