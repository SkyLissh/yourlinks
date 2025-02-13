import { z } from "zod";

const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png"];

export const PictureValidator = z
	.instanceof(File, { message: "Picture is required" })
	.refine((file) => file.size <= 5e6, {
		message: "Picture must be less than 5MB"
	})
	.refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type), {
		message: "Picture must be a valid image type"
	});

export const ProfileInfo = z.object({
	picture: z.instanceof(ArrayBuffer),
	preview: z.string().optional(),
	name: z.string().min(3, { message: "Name is required" }),
	email: z.string().email({ message: "Invalid email address" }).optional(),
	description: z.string().min(1, { message: "Description is required" })
});

export type ProfileInfo = z.infer<typeof ProfileInfo>;
