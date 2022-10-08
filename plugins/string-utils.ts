const times = [
	'ثانیه پیش',
	'دقیقه پیش',
	'ساعت پیش',
	'روز پیش',
	'ماه پیش',
	'سال پیش',
]
const prices = ['هزار', 'میلیون', 'میلیارد', 'تریلیون']

const steps = [60, 60, 24, 30, 12, 9999]

const mesqal = 4.608

export default {
	stringDefTime(time: string, now: any) {
		if (!time) return null

		const old = jsCoreDateCreator(time).getTime() / 1000

		let step = -1
		let count = 0

		let def = Math.ceil(now - old)

		if (def < 10) {
			return 'همین لحظه'
		}

		do {
			step++
			count = def % steps[step]
			def = Math.floor(def / steps[step])
		} while (def > 0)

		return `${count} ${times[step]}`
	},
	stringPrice(price: any, rial: boolean) {
		if (!price || isNaN(price)) return price

		// if (rial && parseInt(price) === 0) return '0'

		let p = Math.round(price / 1000)

		let step = -1
		let count1 = 0
		let count2 = 0

		do {
			step++
			count2 = count1 % 1000
			count1 = p
			p = Math.floor(p / 1000)
		} while (p > 0)

		let s = `${count1}.0`.replace(/\d(?=(\d{3})+\.)/g, '$&,').split('.')[0]

		while (count2 > 0 && count2 % 10 === 0) {
			count2 = Math.floor(count2 / 10)
		}

		if (count2 > 0) {
			s += `.${count2}`
		}

		let r = `${s} ${prices[step]}`

		if (rial) r += ' ریال'

		return r
	},
	escapeHtml(unsafe: string) {
		return unsafe
			.replace(/&/g, '&amp;')
			.replace(/</g, '&lt;')
			.replace(/>/g, '&gt;')
			.replace(/"/g, '&quot;')
			.replace(/'/g, '&#039;')
	},
	thousandFormat(value: any): any {
		if (!value) return ""
		let v = ((value || "") + "") as string
		let v2 = ""
		let m = false
		if (v.includes(".")) {
			const i = v.indexOf(".")
			v2 = v.substring(i, v.length)
			v = v.substring(0, i)
		}
		if (v.includes("-")) {
			v = v.replace("-", "")
			m = true
		}
		v = v
			.replace(/,/g, "")
			.split("")
			.reverse()
			.join("")
			.replace(/(...)/g, "$1,")
			.split("")
			.reverse()
			.join("")
			.replace(/^,+|,+$/, "")
		if (m) v = "-" + v
		return v + v2
	},
	prettyPrice(value: any) {
		let p: any = +value
		if (isNaN(p)) return ""

		const fractionDigits = 0
		p = +p.toFixed(fractionDigits)
		const formatter = new Intl.NumberFormat("en-IN", {
			useGrouping: false,
			maximumFractionDigits: 15,
		})
		p = formatter.format(p)

		return this.thousandFormat(p)
	},
	stringWeight(weight: any) {
		weight = Number(weight)
		if(!weight) return { value: null, label: null }
		const m2 = weight / (mesqal / 2)
		if(m2 === Math.round(m2)) {
			return { value: m2 / 2, label: 'مثقال'}
		}else {
			return { value: weight, label: 'گرم'}
		}
	}
}

const jsCoreDateCreator = (dateString: string) => {
	// dateString *HAS* to be in this format "YYYY-MM-DD HH:MM:SS"
	let dateParam = dateString.split(/[\s-:]/)
	dateParam[1] = (parseInt(dateParam[1], 10) - 1).toString()
	return new Date(
		+dateParam[0],
		+dateParam[1],
		+dateParam[2],
		+dateParam[3],
		+dateParam[4],
		+dateParam[5]
	)
}
