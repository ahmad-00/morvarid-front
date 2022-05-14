import type { NuxtConfig } from '@nuxt/types'
const env = require('dotenv').config({path: './.env'}).parsed || {}

env.BROWSER_BASE_URL =
	env.BROWSER_BASE_URL || process.env.BROWSER_BASE_URL || '/api/'
env.BASE_URL =
	env.BASE_URL || process.env.BASE_URL || 'https://cgdev.ir/sms-panel-api/'
env.ENABLE_PROXY =
	Number(env.ENABLE_PROXY) || Number(process.env.ENABLE_PROXY) || 0
env.CATEGORY_SAFFRON_ID = env.CATEGORY_SAFFRON_ID || process.env.CATEGORY_SAFFRON_ID
env.CATEGORY_CARDAMON_ID = env.CATEGORY_CARDAMON_ID || process.env.CATEGORY_CARDAMON_ID

const dev = process.env.NODE_ENV !== 'production'
const enableProxy = env.ENABLE_PROXY
const baseUrl = env.BASE_URL
const browserBaseUrl = env.ENABLE_PROXY ? env.BROWSER_BASE_URL : env.BASE_URL

const config: NuxtConfig = {
	env,
	// Global page headers: https://go.nuxtjs.dev/config-head
	head: {
		title: 'Saffron',
		meta: [
			{charset: 'utf-8'},
			{name: 'viewport', content: 'width=device-width, initial-scale=1'},
			{hid: 'description', name: 'description', content: ''},
			{name: 'format-detection', content: 'telephone=no'},
		],
		link: [{rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'}],
		bodyAttrs: {
			dir: 'rtl'
		}
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
	],

	// Axios module configuration: https://go.nuxtjs.dev/config-axios
	axios: {
		progress: true,
		baseURL: baseUrl,
		browserBaseURL: browserBaseUrl,
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
	proxy: {
		[browserBaseUrl]: {
			target: baseUrl,
			pathRewrite: {[`^${browserBaseUrl}`]: ''},
		},
	},
	// Build Configuration: https://go.nuxtjs.dev/config-build
	build: {
		standalone: true,
	},
}

export default config
