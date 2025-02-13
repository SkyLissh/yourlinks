"use client";

import { useEffect } from "react";

import { v4 as uuidv4 } from "uuid";
import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { PlusIcon } from "lucide-react";
import { Reorder } from "motion/react";
import { useTranslations } from "next-intl";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import { useDebouncedCallback } from "use-debounce";

import { SocialMediaItem } from "@/components/social-media-item";
import { Button } from "@/components/ui/button";

import { SocialMedia } from "@/models/social-media";

import { useSocialStore } from "@/stores/use-social-store";

const SocialLinksForm = z.object({
	links: SocialMedia.array()
});

export function SocialMediaTab() {
	const t = useTranslations();
	const replaceLinks = useSocialStore((state) => state.replaceLinks);
	const links = useSocialStore((state) => state.links);

	const methods = useForm<{
		links: Partial<SocialMedia>[];
	}>({
		resolver: zodResolver(SocialLinksForm),
		defaultValues: { links }
	});

	const { handleSubmit, watch, control } = methods;

	const { fields, append, remove, swap } = useFieldArray({
		control,
		name: "links"
	});

	const debouncedReplaceLinks = useDebouncedCallback(replaceLinks, 1000);

	const onSubmit = (data: { links: Partial<SocialMedia>[] }) => {
		replaceLinks(data.links);
	};

	const onReorder = (newValues: typeof fields) => {
		const diff = fields.findIndex((field, index) => field.id !== newValues[index].id);

		if (diff === -1) return;

		const index = newValues.findIndex((field) => field.id === fields[diff].id);
		swap(diff, index);
	};

	useEffect(() => {
		const subscription = watch((value, { name }) => {
			if (!value.links) return;
			if (name?.includes("type")) replaceLinks(value.links as Partial<SocialMedia>[]);
			else debouncedReplaceLinks(value.links as Partial<SocialMedia>[]);
		});

		return () => subscription.unsubscribe();
	}, [watch, debouncedReplaceLinks, replaceLinks]);

	return (
		<article className="bg-card py-4 px-8 flex-1 flex flex-col gap-4">
			<h2 className="text-2xl font-bold">{t("linksTitle")}</h2>
			<p className="text-muted-foreground">{t("linksDescription")}</p>

			<Button
				variant="outline"
				className="w-full"
				onClick={() => append({ id: uuidv4() })}
			>
				<PlusIcon />
				{t("addNewLink")}
			</Button>

			<FormProvider {...methods}>
				<form
					onSubmit={handleSubmit(onSubmit)}
					className="flex flex-col gap-4 flex-1 overflow-y-auto"
				>
					<Reorder.Group
						axis="y"
						className="flex flex-col gap-6 overflow-y-auto flex-1"
						layoutScroll
						onReorder={onReorder}
						values={fields}
					>
						{fields.map((field, index) => (
							<SocialMediaItem
								key={field.id}
								link={field}
								index={index}
								onRemove={() => remove(index)}
							/>
						))}
					</Reorder.Group>

					<Button type="submit" className="w-full">
						{t("save")}
					</Button>
				</form>
			</FormProvider>
		</article>
	);
}
