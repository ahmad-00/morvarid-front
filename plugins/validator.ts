import { Context, Plugin } from '@nuxt/types'

type ValidationTypes =
	| 'empty'
	| 'email'
	| 'equel'
	| 'mobile'
	| ''
	| 'minLength'
	| 'maxLength'
	| 'max'
	| 'min'
	| 'valid'

const regex = (v: any, r: any) => {
	return empty(v) ? null : r.exec(v) !== null
}

const empty = (s: any) => {
	return s === '' || s === undefined || s === null
}

const number = (v: any) => {
	const r = /^\d+$/gm
	return empty(v) ? true : regex(v, r)
}

const strings = {
	number: (field: string) => `فیلد ${field} باید عدد باشد`,
	equel: (field: string) => `فیلد ${field} اشتباه است`,
	email: (field: string) => `فیلد ${field} اشتباه است`,
	mobile: (field: string) => `فیلد ${field} اشتباه است`,
	tel: (field: string) => `فیلد ${field} اشتباه است`,
	shaba: (field: string) => `فیلد ${field} اشتباه است`,
	length: (field: string, n: any) => `فیلد ${field} باید ${n} کاراکتر باشد`,
	minLength: (field: string, n: any) =>
		`فیلد ${field} باید حداقل ${n} کاراکتر باشد`,
	maxLength: (field: string, n: any) =>
		`فیلد ${field} باید حداکثر ${n} کاراکتر باشد`,
	min: (field: string, n: any) => `فیلد ${field} باید بزرگنر مساوی ${n} باشد`,
	max: (field: string, n: any) => `فیلد ${field} باید کوچکتر مساوی ${n} باشد`,
	valid: (field: string, n: any) => `فیلد ${field} نباید خالی باشد`,
}

const validator = {
	number,
	email(v: any) {
		const r = /^.+@.+\..+$/gm
		return empty(v) ? true : regex(v, r)
	},
	equel(v: any, t: any) {
		return empty(v) ? true : v === t
	},
	mobile(v: any) {
		const r = /^[0+]\d{10,17}$/gm
		return empty(v) ? true : regex(v, r)
	},
	tel(v: any) {
		const r = /^0\d{4,10}$/gm
		return empty(v) ? true : regex(v, r)
	},
	minLength(v: any, t: any) {
		return empty(v) ? true : v.length >= t
	},
	maxLength(v: any, t: any) {
		return empty(v) ? true : v.length <= t
	},
	length(v: any, t: any) {
		const r = new RegExp(`^.{${t}}$`, 'gm')
		return empty(v) ? true : regex(v, r)
	},
	max(v: any, t: any) {
		const n = parseInt(v)
		return empty(v) ? true : number(v) && n <= t
	},
	min(v: any, t: any) {
		const n = parseInt(v)
		return empty(v) ? true : number(v) && n >= t
	},
	shaba(v: any, t: any) {
		const r = /^(IR|ir)\d{24}$/gm
		return empty(v) ? true : regex(v, r)
	},
	valid(v: any) {
		return empty(v) ? null : true
	},
	validate(value: any, field: string, validations: string): string[] {
		const a: string[] = []
		validations.split('|').forEach((o) => {
			const [k, n] = [
				...o
					.replace(']', '')
					.split('[')
					.filter((t) => t),
				null,
				null,
			]
			// @ts-ignore
			const f = validator[k]
			if (f && f(value, n) !== true) {
				// @ts-ignore
				const f2 = strings[k]
				a.push(f2(field, n))
			}
		})
		return a
	},
}

export default validator
