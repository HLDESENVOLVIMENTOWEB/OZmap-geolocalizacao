import { Router } from 'express';
import * as regionController from '../contollers/regiaoController'; 

const router = Router();

router.post('/', regionController.createRegion); 
router.get('/:id', regionController.getRegionById); 
router.put('/:id', regionController.updateRegionById); 
router.delete('/:id', regionController.deleteRegionById); 

router.get('/', regionController.listRegions);

router.post('/containsPoint', regionController.listRegionsContainingPoint);

router.post('/nearPoint', regionController.listRegionsNearPoint);

export default router;
