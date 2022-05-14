import { NuxtAxiosInstance } from '@nuxtjs/axios'
import Vue from 'vue'
import RouteUrl from '~/config/route-url'
import ApiUrl from '~/config/api-url'
import { fanum, toastErrors, errorPage } from '~/plugins/global'
import { NuxtCookies } from 'cookie-universal-nuxt'
import FA from '~/config/fa'
import { VueIzitoast } from 'vue-izitoast'
import validator from '~/plugins/validator'
import StringUtils from '~/plugins/string-utils'

type Globals = {
	$routeUrl: typeof RouteUrl
	$apiUrl: typeof ApiUrl
	$toastErrors: typeof toastErrors
	$errorPage: typeof errorPage
	$axios: NuxtAxiosInstance
	$toast: VueIzitoast
	$cookies: NuxtCookies
	$strings: typeof FA
	$validator: typeof validator
	$stringUtils: typeof StringUtils
	$fanum: typeof fanum
}

declare module 'vue/types/vue' {
	// this.$myInjectedFunction inside Vue components
	interface Vue extends Globals {}
}

declare module '@nuxt/types' {
	// nuxtContext.app.$myInjectedFunction inside asyncData, fetch, plugins, middleware, nuxtServerInit
	interface NuxtAppOptions extends Globals {}
	// nuxtContext.$myInjectedFunction
	interface Context extends Globals {}
}

declare module 'vuex/types/index' {
	// this.$myInjectedFunction inside Vuex stores
	interface Store<S> extends Globals {}
}
