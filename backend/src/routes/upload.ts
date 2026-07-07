import { Router, Request, Response } from "express";

import { generateUploadUrl } from "../services/generate-upload-url";

const router = Router();

router.get(
  "/upload-url",
  async (req: Request, res: Response): Promise<void> => {
    const filename = req.query.filename as string;
    const contentType = req.query.contentType as string;

    if (!filename || !contentType) {
      res.status(400).json({
        error: "filename e contentType são obrigatórios",
      });

      return;
    }

    const result = await generateUploadUrl({
      filename,
      contentType,
    });

    res.json(result);
  }
);

export default router;