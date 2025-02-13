import Image from "next/image";
import { useRef } from "react";

import { ImageIcon } from "lucide-react";
import { useTranslations } from "next-intl";

export function ImagePicker({
	image,
	onChange
}: {
	image?: string;
	onChange: (file: File) => void;
}) {
	const t = useTranslations();
	const inputRef = useRef<HTMLInputElement>(null);
	return (
		<>
			<input
				ref={inputRef}
				type="file"
				hidden
				accept="image/png, image/jpeg"
				onChange={(e) => {
					const file = e.target.files?.[0];
					if (!file) return;

					onChange(file);
				}}
			/>
			{image ? (
				<div
					className="relative size-56 rounded-xl bg-card border-border border cursor-pointer group"
					role="button"
					aria-label={t("changeImage")}
					onClick={() => inputRef.current?.click()}
				>
					<Image
						src={image}
						alt={t("profilePicture")}
						fill
						className="object-contain rounded-xl"
					/>
					<div className="flex flex-col items-center justify-center h-full w-full gap-4 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 group-hover:opacity-100 bg-black/50 text-primary-foreground rounded-xl p-2 opacity-0 transition-opacity ease-in-out duration-300">
						<ImageIcon className="size-12" />
						<span className="flex items-center font-medium">{t("changeImage")}</span>
					</div>
				</div>
			) : (
				<div
					className="bg-accent text-accent-foreground rounded-xl size-56 flex flex-col items-center justify-center gap-2 cursor-pointer"
					role="button"
					aria-label={t("uploadProfilePicture")}
					onClick={() => inputRef.current?.click()}
				>
					<ImageIcon className="size-12" />
					<span className="flex items-center font-medium">{t("upload")}</span>
				</div>
			)}
		</>
	);
}
