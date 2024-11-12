"use server";

import sharp from "sharp";

export async function convertToWebP(formData: FormData) {
    const file = formData.get("file") as File;
    if (!file) {
        throw new Error("No file uploaded");
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const webpBuffer = await sharp(buffer).webp().toBuffer();

    return {
        webpBuffer: webpBuffer.toString("base64"),
        filename: file.name.replace(/\.[^/.]+$/, "") + ".webp",
    };
}
