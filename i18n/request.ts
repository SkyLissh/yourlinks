import { getRequestConfig } from "next-intl/server";
import { headers } from "next/headers";

const locales = ["en-US"];

export default getRequestConfig(async ({}) => {
	const headersList = await headers();
	const acceptLanguage = headersList.get("accept-language")?.split(",")[0] ?? "en-US";
	const locale = locales.includes(acceptLanguage) ? acceptLanguage : "en-US";

	return {
		locale,
		messages: (await import(`./${locale}.json`)).default
	};
});
