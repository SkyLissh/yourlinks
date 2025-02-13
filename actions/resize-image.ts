"use server";

import type { Area } from "react-easy-crop";
import sharp from "sharp";

export async function resizeImage(buffer: ArrayBuffer, croppedArea: Area) {
	const metadata = await sharp(buffer).metadata();

	const image = await sharp(buffer)
		.extract({
			left: Math.round((croppedArea.x / 100) * (metadata.width ?? 0)),
			top: Math.round((croppedArea.y / 100) * (metadata.height ?? 0)),
			width: Math.round((croppedArea.width / 100) * (metadata.width ?? 0)),
			height: Math.round((croppedArea.height / 100) * (metadata.height ?? 0))
		})
		.resize(1024, 1024)
		.jpeg({ quality: 80, mozjpeg: true })
		.toBuffer();
	return image;
}
