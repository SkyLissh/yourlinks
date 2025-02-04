import Link from "next/link";

import { CircleUser, EyeIcon, Link as LinkIcon, PlusIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { getTranslations } from "next-intl/server";

export default async function Home() {
	const t = await getTranslations();

	return (
		<>
			<header>
				<nav className="px-8 py-4 bg-card">
					<ul className="flex items-center justify-between gap-2 container mx-auto px-4">
						<li>
							<Link href="/" className="flex items-center gap-2">
								<div className="flex items-center justify-center bg-primary text-primary-foreground rounded-lg p-2">
									<LinkIcon className="size-4 rotate-45 stroke-2" />
								</div>
								<h1 className="text-2xl font-bold hidden md:block">{t("yourlinks")}</h1>
							</Link>
						</li>
						<li>
							<div className="flex items-center gap-6">
								<Button variant="ghost">
									<LinkIcon />
									<span className="hidden md:block">{t("links")}</span>
								</Button>
								<Button variant="ghost">
									<CircleUser />
									<span className="hidden md:block">{t("profile")}</span>
								</Button>
							</div>
						</li>
						<li>
							<Button variant="outline">
								<EyeIcon className="size-6 md:hidden" />
								<span className="hidden md:block">{t("preview")}</span>
							</Button>
						</li>
					</ul>
				</nav>
			</header>
			<main className="container mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
				<article></article>
				<article className="bg-card py-4 px-8">
					<h2 className="text-2xl font-bold">Customize your links</h2>
					<p className="text-muted-foreground mb-4">
						Add/edit/remove links below and then share all your profiles with the world!
					</p>

					<Button variant="outline" className="w-full">
						<PlusIcon />
						{t("addNewLink")}
					</Button>
				</article>
			</main>
		</>
	);
}
