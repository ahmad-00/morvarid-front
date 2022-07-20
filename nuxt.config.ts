// @ts-ignore
import type { NuxtConfig } from '@nuxt/types'
// @ts-ignore
import axios from 'axios'
import ApiUrl from './config/api-url'

const env = require('dotenv').config({ path: './.env' }).parsed || {}

env.BROWSER_BASE_URL =
	process.env.BROWSER_BASE_URL || env.BROWSER_BASE_URL || '/api/'

env.BASE_URL = process.env.BASE_URL || env.BASE_URL || 'http://141.11.42.199/'
env.BASE_URL = env.BASE_URL?.replace(/\/$/, '') + '/'

env.SITE_URL =
	process.env.SITE_URL ||
	env.SITE_URL ||
	'https://morvaridsepid.herokuapp.com'
env.SITE_URL = env.SITE_URL?.replace(/\/$/, '')

env.MEDIA_URL = process.env.MEDIA_URL || env.MEDIA_URL || null
if (env.MEDIA_URL) {
	env.MEDIA_URL = env.MEDIA_URL?.replace(/\/$/, '') + '/'
}

env.ENABLE_PROXY =
	Number(process.env.ENABLE_PROXY) || Number(env.ENABLE_PROXY) || 0

env.CATEGORY_SAFFRON_ID =
	process.env.CATEGORY_SAFFRON_ID || env.CATEGORY_SAFFRON_ID

env.CATEGORY_CARDAMON_ID =
	process.env.CATEGORY_CARDAMON_ID || env.CATEGORY_CARDAMON_ID

const dev = process.env.NODE_ENV !== 'production'
const enableProxy = env.ENABLE_PROXY
const baseUrl = env.BASE_URL
const mediaUrl = env.MEDIA_URL
const siteUrl = env.SITE_URL
const browserBaseUrl = env.ENABLE_PROXY ? env.BROWSER_BASE_URL : env.BASE_URL

const config: NuxtConfig = {
	// Global page headers: https://go.nuxtjs.dev/config-head
	head: {
		title: 'Saffron',
		meta: [
			{ charset: 'utf-8' },
			{
				name: 'viewport',
				content: 'width=device-width, initial-scale=1',
			},
			{ hid: 'description', name: 'description', content: '' },
			{ name: 'format-detection', content: 'telephone=no' },
			{ name: 'msapplication-TileColor', content: '#ffffff' },
			{ name: 'theme-color', content: '#603CB7' },
			{ name: 'fontiran.com:license', content: 'XPQYPB' },
		],
		link: [
			{
				rel: 'apple-touch-icon',
				size: '180x180',
				href: '/apple-touch-icon.png',
			},
			{
				rel: 'icon',
				type: 'image/png',
				sizes: '32x32',
				href: '/favicon-32x32.png',
			},
			{
				rel: 'icon',
				type: 'image/png',
				sizes: '16x16',
				href: '/favicon-16x16.png',
			},
			{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
			{ rel: 'manifest', href: '/site.webmanifest' },
			{
				rel: 'mask-icon',
				href: '/safari-pinned-tab.svg',
				color: '#7E5DED',
			},
		],
		bodyAttrs: {
			dir: 'rtl',
		},
	},
	// Global CSS: https://go.nuxtjs.dev/config-css
	css: ['~/assets/css/style.scss'],

	// Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
	plugins: [
		'~/plugins/global.ts',
		{
			src: '~/plugins/toasted.ts',
			mode: 'client',
		},
		{
			src: '~/plugins/dragscroll.ts',
			mode: 'client',
		},
		{
			src: '~/plugins/scroll-lock.ts',
			mode: 'client',
		},
		{
			src: '~/plugins/custom-scrollbar.ts',
			mode: 'client',
		},
		'~/plugins/axios.ts',
	],

	// Auto import components: https://go.nuxtjs.dev/config-components
	components: true,

	// Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
	buildModules: [
		// https://go.nuxtjs.dev/typescript
		'@nuxt/typescript-build',
		// https://go.nuxtjs.dev/tailwindcss
		'@nuxtjs/tailwindcss',
		'cookie-universal-nuxt',
	],

	// Modules: https://go.nuxtjs.dev/config-modules
	modules: [
		// https://go.nuxtjs.dev/axios
		'@nuxtjs/axios',
		'cookie-universal-nuxt',
		'nuxt-svg-loader',
		'@nuxtjs/sitemap',
		'@nuxtjs/robots',
	],

	// Axios module configuration: https://go.nuxtjs.dev/config-axios
	axios: {
		progress: true,
		debug: dev,
		proxy: enableProxy,
		headers: {
			common: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				Format: 'json',
			},
		},
	},
	publicRuntimeConfig: {
		axios: {
			baseURL: browserBaseUrl,
		},
		env: {
			BASE_URL: browserBaseUrl,
			SITE_URL: siteUrl,
			MEDIA_URL: mediaUrl || browserBaseUrl,
			CATEGORY_SAFFRON_ID: env.CATEGORY_SAFFRON_ID,
			CATEGORY_CARDAMON_ID: env.CATEGORY_CARDAMON_ID,
		},
	},
	privateRuntimeConfig: {
		axios: {
			baseURL: baseUrl,
		},
		env: {
			BASE_URL: baseUrl,
			SITE_URL: siteUrl,
			MEDIA_URL: mediaUrl || baseUrl,
			CATEGORY_SAFFRON_ID: env.CATEGORY_SAFFRON_ID,
			CATEGORY_CARDAMON_ID: env.CATEGORY_CARDAMON_ID,
		},
	},
	proxy: {
		[browserBaseUrl]: {
			target: baseUrl,
			pathRewrite: { [`^${browserBaseUrl}`]: '' },
		},
	},
	// Build Configuration: https://go.nuxtjs.dev/config-build
	build: {
		standalone: true,
	},
	sitemap: {
		hostname: siteUrl,
		gzip: true,
		cacheTime: 1000 * 60 * 60,
		exclude: ['/panel/**', '/shop/basket', '/blog', '/blog/**'],
		routes: async () => {
			// shop categories
			const shopCategories = (
				await axios.get(baseUrl + ApiUrl.GetShopCategories())
			).data.map((v: any) => `/shop/category/${v.id}`)

			// shop products
			let shopProducts: string[] = []
			let fetchedProductPage = 0
			while (true) {
				const r = (
					await axios.get(baseUrl + ApiUrl.GetShopProducts(), {
						params: {
							limit: 100,
							offset: fetchedProductPage * 100,
						},
					})
				).data
				shopProducts = [
					...shopProducts,
					...r.results.map((v: any) => `/shop/product/${v.id}`),
				]
				fetchedProductPage++
				if (!r.next) break
			}

			return [
				// auth
				'/auth/forget-password',
				'/auth/login',
				'/auth/register',
				'/auth/secret-login',
				// shop
				'/shop',
				...shopCategories,
				...shopProducts,
				'',
			]
		},
	},
	robots: {
		UserAgent: '*',
		Host: siteUrl,
		Disallow: ['/auth/', '/panel/', '/shop/basket', '/blog/'],
		Sitemap: `${siteUrl}/sitemap.xml`,
	},
}

export default config
