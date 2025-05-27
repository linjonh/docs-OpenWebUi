import { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";

import { themes as prismThemes } from "prism-react-renderer";

const config: Config = {
	title: "Open WebUI",
	tagline: "On a mission to build the best AI interface",
	favicon: "images/favicon.png",

	// Set the production url of your site here
	url: "https://openwebui.codelin.vip",
	// Set the /<baseUrl>/ pathname under which your site is served
	// For GitHub pages deployment, it is often '/<projectName>/'
	baseUrl: "/",

	// GitHub pages deployment config.
	// If you aren't using GitHub pages, you don't need these.
	organizationName: "open-webui", // Usually your GitHub org/user name.
	projectName: "docs-OpenWebUi", // Usually your repo name.

	onBrokenLinks: "warn",
	onBrokenMarkdownLinks: "warn",

	// Even if you don't use internationalization, you can use this field to set
	// useful metadata like html lang. For example, if your site is Chinese, you
	// may want to replace "en" with "zh-Hans".
	i18n: {
		defaultLocale: "zh-Hans",
		locales: ["zh-Hans","zh-HK","ja","ko","en","pt","es","fr","de","ru"],
		localeConfigs: {
			"en": {
				label: 'English',
			},
			"zh": {
				label: '简体中文',
			},
			"zh-HK": {
				label: '繁體中文',
			},
			"ja": {
				label: '日本語',
			},
			"ko": {
				label: '한국어（韩语）',
			},
			"de": {
				label: 'Deutsch（德语）',
			},
			"es": {
				label: 'Español（西班牙语）',
			},
			"fr": {
				label: 'Français（法语）',
			},
			"pt": {
				label: 'Português（葡萄牙）',
			},
			"ru": {
				label: 'Русский（俄语）',
			},
		},
	},

	// Enable Mermaid for diagrams
	markdown: {
		mermaid: true,
	},
	themes: ["@docusaurus/theme-mermaid"],

	presets: [
		[
			"classic",
			{
				gtag: {
					trackingID: "G-ZQJ9LZDR1Y",
					anonymizeIP: false,
				},
				docs: {
					sidebarPath: "./sidebars.ts",
					routeBasePath: "/",
					// Please change this to your repo.
					// Remove this to remove the "edit this page" links.
					// editUrl: "https://github.com/open-webui/docs/blob/main",
					exclude: ["**/tab-**/**"],
				},
				// blog: false,
				blog: {
					showReadingTime: true,
					// Please change this to your repo.
					// Remove this to remove the "edit this page" links.
					// editUrl:
					// "https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/",
				},
				theme: {
					customCss: "./src/css/custom.css",
				},
			} satisfies Preset.Options,
		],
	],

	themeConfig: {
		// Replace with your project's social card
		// image: "images/docusaurus-social-card.jpg",
		navbar: {
			title: "Open WebUI (Translated by 林建有)",
			logo: {
				src: "images/logo.png",
				srcDark: "images/logo-dark.png",
			},
			items: [
				// {
				// 	type: "docSidebar",
				// 	position: "left",
				// 	sidebarId: "pipelines",
				// 	label: "Pipelines",
				// },

				// {
				//   type: "docSidebar",
				//   sidebarId: "blog",
				//   position: "left",
				//   label: "Blog",
				// },

				// {
				//   href: "/blog",
				//   label: "Blog",
				//   position: "left",
				// },
				{//多语言选择项
					type: 'localeDropdown',
					position: 'right',
				},
				{
					href: "https://github.com/open-webui/open-webui",
					position: "right",
					className: "header-github-link",
					"aria-label": "GitHub repository",
				},
				{
					href: "https://discord.com/invite/5rJgQTnV4s",
					position: "right",
					className: "header-discord-link",
					"aria-label": "Discord server",
				},
			],
		},
		footer: {
			logo: {
				src: "images/logo-dark.png",
				height: 100,
			},
			style: "light",
			links: [
				{
					title: "Docs",
					items: [
						{
							label: "Getting Started",
							to: "getting-started",
						},
						{
							label: "FAQ",
							to: "faq",
						},
					],
				},
				{
					title: "Community",
					items: [
						{
							label: "GitHub",
							href: "https://github.com/open-webui/open-webui",
						},
						{
							label: "Discord",
							href: "https://discord.gg/5rJgQTnV4s",
						},
						{
							label: "𝕏",
							href: "https://x.com/OpenWebUI",
						},
					],
				},
				{
					title: "More",
					items: [
						{
							label: "Release Notes",
							to: "https://github.com/open-webui/open-webui/blob/main/CHANGELOG.md",
						},
						{
							label: "About",
							to: "https://openwebui.com",
						},
					],
				},
			],
			copyright: `Copyright © ${new Date().getFullYear()} Translated by 林建有`,
		},
		prism: {
			theme: prismThemes.github,
			darkTheme: prismThemes.dracula,
		},
	} satisfies Preset.ThemeConfig,
	plugins: [require.resolve("docusaurus-lunr-search")],
	headTags: [
		// add google adsense
		// <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5363852791482518"
		//  crossorigin="anonymous"></script>
		{
			tagName: "script",
			attributes: {
				async: "true",
				crossorigin: "anonymous",
				src: "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5363852791482518",
				// "data-ad-client": "ca-pub-5363852791482518",
			},
		},
	],
};

export default config;
