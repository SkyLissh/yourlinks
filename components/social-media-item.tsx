"use client";

import { Reorder, useDragControls } from "motion/react";
import { useTranslations } from "next-intl";
import { Controller, FieldError, useFormContext } from "react-hook-form";

import { Icon } from "@iconify/react";
import { Equal } from "lucide-react";

import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from "./ui/select";

import { SocialMedia, SocialMediaTypes } from "@/models/social-media";

export function SocialMediaItem({
	link,
	index,
	onRemove
}: {
	link: Partial<SocialMedia>;
	index: number;
	onRemove?: () => void;
}) {
	const t = useTranslations();
	const controls = useDragControls();
	const {
		register,
		control,
		formState: { errors }
	} = useFormContext<{ links: Partial<SocialMedia>[] }>();

	return (
		<Reorder.Item value={link} dragListener={false} dragControls={controls}>
			<article className="bg-background p-4 flex flex-col gap-2">
				<div className="flex justify-between text-muted-foreground">
					<div className="flex gap-2 items-center">
						<Equal className="cursor-move" onPointerDown={(e) => controls.start(e)} />
						<p className="font-semibold">
							{t("link")} #{index + 1}
						</p>
					</div>
					<Button variant="link" onClick={onRemove}>
						{t("remove")}
					</Button>
				</div>
				<label className="flex flex-col gap-2">
					<p className="text-sm">{t("platform")}</p>
					<Controller
						control={control}
						name={`links.${index}.type`}
						render={({ field }) => (
							<Select
								onValueChange={field.onChange}
								value={field.value}
								aria-invalid={!!errors.links?.[index]?.type}
								aria-describedby={`type-error-${index}`}
							>
								<SelectTrigger>
									<SelectValue placeholder={t("platform")} />
								</SelectTrigger>
								<SelectContent>
									{SocialMediaTypes.options.map((option) => (
										<SelectItem key={option} value={option}>
											<div className="flex items-center gap-2 capitalize">
												<Icon icon={`tabler:brand-${option}`} className="size-6" />
												{option}
											</div>
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						)}
					/>
					{errors.links?.[index]?.type &&
						typeof errors.links[index].type === "object" && (
							<p
								id={`type-error-${index}`}
								className="text-destructive text-sm font-medium"
							>
								{(errors.links[index].type as FieldError).message}
							</p>
						)}
				</label>
				<label className="flex flex-col gap-2">
					<p className="text-sm">{t("link")}</p>
					<Input
						type="url"
						aria-invalid={!!errors.links?.[index]?.link}
						aria-describedby={`link-error-${index}`}
						placeholder="https://example.com"
						{...register(`links.${index}.link`)}
					/>
					{errors.links?.[index]?.link && (
						<p
							id={`link-error-${index}`}
							className="text-destructive text-sm font-medium"
						>
							{errors.links[index].link.message}
						</p>
					)}
				</label>
			</article>
		</Reorder.Item>
	);
}
