import { getRequestConfig } from "next-intl/server";
import { headers } from "next/headers";

const locales = ["en"];

export default getRequestConfig(async ({}) => {
	const headersList = await headers();
	const acceptLanguage =
		headersList.get("accept-language")?.split(",")[0]?.split("-")[0] ?? "en";
	const locale = locales.includes(acceptLanguage) ? acceptLanguage : "en";

	return {
		locale,
		messages: (await import(`./${locale}.json`)).default
	};
});
