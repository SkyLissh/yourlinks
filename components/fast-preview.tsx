"use client";

import Image from "next/image";

import { Icon } from "@iconify/react";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";

import { useProfileStore } from "@/stores/use-profile-store";
import { useSocialStore } from "@/stores/use-social-store";

export function FastPreview() {
  const t = useTranslations();

  const links = useSocialStore((state) => state.links);
  const profile = useProfileStore((state) => state.profile);

  return (
    <section className="absolute inset-0 left-1/2 top-1/2 z-10 flex h-[83%] w-2/3 -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-12 overflow-y-auto pt-4">
      <div className="flex w-full flex-col items-center gap-4">
        {profile.preview ? (
          <Image
            src={profile.preview}
            alt={t("profilePicture")}
            width={100}
            height={100}
            className="aspect-square w-2/5 rounded-full border border-border"
          />
        ) : (
          <div className="aspect-square w-2/5 rounded-full bg-zinc-200"></div>
        )}
        {profile.name ? (
          <div className="flex flex-col items-center">
            <p>{profile.name}</p>
            {profile.email && <p className="text-xs font-semibold">{profile.email}</p>}
          </div>
        ) : (
          <div className="h-5 w-2/3 rounded-full bg-zinc-200"></div>
        )}
        {profile.description ? (
          <p className="max-w-full break-words text-center text-xs text-zinc-500">
            {profile.description}
          </p>
        ) : (
          <div className="h-3 w-1/3 rounded-full bg-zinc-200"></div>
        )}
      </div>

      <ul className="flex w-full flex-col gap-4">
        {links.map((link) => (
          <li key={link.id}>
            <div className="flex h-10 w-full items-center justify-between rounded-lg bg-zinc-200 px-4 capitalize">
              {link.type && (
                <>
                  <span className="flex items-center gap-2">
                    <Icon icon={`tabler:brand-${link.type}`} className="size-5" />
                    {link.type}
                  </span>
                  <ArrowRight className="size-4" />
                </>
              )}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
