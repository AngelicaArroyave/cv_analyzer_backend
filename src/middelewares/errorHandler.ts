import { Request, Response } from "express";

export const errorHandler = (err: any, req: Request, res: Response) => {
    res.status(500).json({ error: err, message: "Internal Server Error" });
}