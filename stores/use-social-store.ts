import { create } from "zustand";
import { combine } from "zustand/middleware";

import { v4 as uuidv4 } from "uuid";

import { SocialMedia } from "@/models/social-media";

export const useSocialStore = create(
	combine(
		{
			links: Array.from<unknown, Partial<SocialMedia>>({ length: 3 }, () => ({
				id: uuidv4()
			}))
		},
		(set) => ({
			replaceLinks: (newLinks: Partial<SocialMedia>[]) => set({ links: [...newLinks] })
		})
	)
);
