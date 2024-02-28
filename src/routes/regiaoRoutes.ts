import { Router } from 'express';
import * as regionController from '../contollers/regiaoController'; 

const router = Router();

router.post('/', regionController.createRegion); 
router.get('/:id', regionController.getRegionById); 
router.put('/:id', regionController.updateRegionById); 
router.delete('/:id', regionController.deleteRegionById); 

router.get('/', regionController.listRegions);

// Note que a rota para listar regiões por ponto é uma rota POST porque estamos enviando dados (um ponto) no corpo da requisição.
router.post('/containsPoint', regionController.listRegionsContainingPoint);

// Listar regiões a uma certa distância de um ponto
// Esta também é uma rota POST por uma razão similar à acima; precisamos de dados do ponto e distância no corpo da requisição.
router.post('/nearPoint', regionController.listRegionsNearPoint);

export default router;
