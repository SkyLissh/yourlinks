import { z } from "zod";

export const SocialMediaTypes = z.enum(
	[
		"instagram",
		"facebook",
		"twitter",
		"linkedin",
		"youtube",
		"tiktok",
		"twitch",
		"discord",
		"github"
	],
	{
		message: "Please select a valid platform"
	}
);

export const SocialMedia = z.object({
	id: z.string().uuid(),
	link: z.string().url({ message: "Please enter a valid URL" }),
	type: SocialMediaTypes
});

export type SocialMediaTypes = z.infer<typeof SocialMediaTypes>;

export type SocialMedia = z.infer<typeof SocialMedia>;
