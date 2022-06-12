import { Plugin } from '@nuxt/types'
import ApiUrl from '~/config/api-url'
import RouteUrl from '~/config/route-url'
import Validator from '~/plugins/validator'
import StringUtils from '~/plugins/string-utils'
import FA from '~/config/fa'
import { AxiosError } from 'axios'

export const toastErrors = (ctx: Vue, e: AxiosError) => {
	const r = e?.response as any

	if (!r) {
		ctx.$toast.error(
			e.message || ctx.$strings.something_went_wrong(),
			'',
			{} as any
		)
	} else if (!r.data) {
		if (!r.statusText)
			ctx.$toast.error(ctx.$strings.something_went_wrong(), '', {} as any)
		else if ([401, 403].includes(r.status)) {
			ctx.$toast.error(ctx.$strings.login_error(), '', {} as any)
		} else ctx.$toast.error(r.statusText, '', {} as any)
	} else if (typeof r.data === 'string') {
		ctx.$toast.error(r.data, '', {} as any)
	} else {
		Object.values(r.data).forEach((i: any) => {
			if (!i) return
			if (typeof i === 'string') {
				ctx.$toast.error(i || '', '', {} as any)
			} else {
				Object.values(i)
					.filter((v) => v)
					.forEach((t: any) => {
						if (typeof t === 'string') {
							ctx.$toast.error(t || '', '', {} as any)
						}
					})
			}
		})
	}
}

export const errorPage = (error: Function, e: AxiosError) => {
	const r = e?.response as any

	const code = e.code
	let statusCode
	let message = null

	if (r) {
		statusCode = r.status

		if (r.data && r.data.errors) {
			const a = Object.values(r.data.errors)
			if (a.length > 0) {
				const b = Object.values(a[0] as any)
				if (b.length > 0) {
					message = b[0]
				}
			}
		}

		if (!message) message = r.statusText
	} else {
		if (code === 'ECONNREFUSED') {
			statusCode = 503
		} else {
			statusCode = e.code
		}
		message = e.message
	}

	error({ code, statusCode, message })
}

export const fanum = (v: any) => {
	return (
		String(v)
			?.split('')
			?.map((c) => {
				switch (c) {
					case '0':
						return '۰'
					case '1':
						return '۱'
					case '2':
						return '۲'
					case '3':
						return '۳'
					case '4':
						return '۴'
					case '5':
						return '۵'
					case '6':
						return '۶'
					case '7':
						return '۷'
					case '8':
						return '۸'
					case '9':
						return '۹'
					default:
						return c
				}
			})
			?.join('') || ''
	)
}

const myPlugin: Plugin = ({ app }, inject) => {
	inject('apiUrl', ApiUrl)
	inject('routeUrl', RouteUrl)
	inject('toastErrors', toastErrors)
	inject('validator', Validator)
	inject('stringUtils', StringUtils)
	inject('errorPage', errorPage)
	inject('strings', FA)
	inject('fanum', fanum)
}

export default myPlugin
