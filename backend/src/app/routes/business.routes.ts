import { Router } from 'express';
import { getBusinessData, regenerateHeadline } from '../controllers/business.controller';

const router = Router();

router.post('/business-data', getBusinessData);
router.get('/regenerate-headline', regenerateHeadline);

export default router;