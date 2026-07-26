import { Request, Response } from "express"
import pdfParse from "pdf-parse"

export const uploadFile = async (req: Request, res: Response) => {
    try {
        if (!req.file) {
            res.status(400).json({ message: "No file uploaded" })
            return
        }

        await pdfParse(req.file.buffer)
        
        res.status(200).json({
            metadata: {
                filename: req.file.originalname,
                mimetype: req.file.mimetype,
                size: req.file.size
            }
        })
    } catch (error) {
        res.status(500).json({ error: error, message: "Internal Server Error" })
    }
}