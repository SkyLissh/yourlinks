import { create } from "zustand";

import { combine } from "zustand/middleware";

import { ProfileInfo } from "@/models/profile-info";

export const useProfileStore = create(
  combine(
    {
      profile: {} as Partial<ProfileInfo>,
    },
    (set) => ({
      updateProfile: (profile: Partial<ProfileInfo>) =>
        set((state) => ({
          profile: { ...profile, preview: state.profile.preview },
        })),
      changePreview: (preview: string) =>
        set((state) => ({ profile: { ...state.profile, preview } })),
    })
  )
);
