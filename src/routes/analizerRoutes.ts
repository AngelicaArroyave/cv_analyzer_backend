import { Router } from "express"
import multer from "multer"

import { uploadFile } from "../controllers/analizerController"

const upload = multer({ storage: multer.memoryStorage() })

export const router = Router()

router.post('/upload', upload.single('file'), uploadFile)