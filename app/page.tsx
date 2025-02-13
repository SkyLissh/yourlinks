import Link from "next/link";

import { getTranslations } from "next-intl/server";

import { CircleUser, EyeIcon, Link as LinkIcon } from "lucide-react";

import { IphoneFrame } from "@/components/iphone-frame";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { FastPreview } from "@/components/fast-preview";
import { ProfileTab } from "@/components/profile-tab";
import { SocialMediaTab } from "@/components/social-media-tab";

export default async function Home() {
	const t = await getTranslations();

	return (
		<Tabs defaultValue="links">
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
							<TabsList>
								<TabsTrigger value="links">
									<LinkIcon />
									<span className="hidden md:block">{t("links")}</span>
								</TabsTrigger>
								<TabsTrigger value="profile">
									<CircleUser />
									<span className="hidden md:block">{t("profile")}</span>
								</TabsTrigger>
							</TabsList>
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
			<main className="container mx-auto p-6 flex gap-6 h-[calc(100vh-80px)]">
				<article className="hidden bg-card w-full xl:flex items-center justify-center flex-1">
					<div className="w-1/2 aspect-[9/16] relative">
						<IphoneFrame className="w-full absolute aspect-[9/16] stroke-zinc-400" />
						<FastPreview />
					</div>
				</article>
				<TabsContent asChild value="links" className="m-0">
					<SocialMediaTab />
				</TabsContent>
				<TabsContent asChild value="profile" className="m-0">
					<ProfileTab />
				</TabsContent>
			</main>
		</Tabs>
	);
}
