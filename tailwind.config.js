module.exports = {
	purge: [
		'./components/**/*.{vue,js}',
		'./layouts/**/*.vue',
		'./pages/**/*.vue',
		'./store/**/*.{js,ts}',
		'./plugins/**/*.{js,ts}',
		'./nuxt.config.{js,ts}',
	],
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {
			colors: {
				primary: '#7E5DED',
				'primary-dark': '#603CB7',
				'natural-dark': '#1F2F60',
				'natural-semidark': '#455A64',
				'natural-mute': '#607d8b',
				saffron: '#F44336',
				cardamom: '#8BC34A',
				grey: {
					50: '#FAFAFA',
				},
			},
			spacing: {
				'2/3': '66.666667%',
				'1/1': '100%',
				'3/4': '75%',
				'9/16': '56.25%',
				'16/9': '177.77%',
				'4/3': '133.33%',
			},
			fontFamily: {
				'iran-sans': 'IRANSans',
				lalezar: 'Lalezar',
			},
			zIndex: {
				1: 1,
				2: 2,
				3: 3,
				'-1': -1,
			},
			borderRadius: {
				9: 36,
				10: 42,
				13: 52,
			},
			opacity: {
				3: '0.03',
			},
		},
		ripple: (theme) => ({
			colors: theme('colors'),
		}),
	},
	variants: {
		extend: {
			width: ['responsive', 'hover', 'focus'],
			height: ['responsive', 'hover', 'focus'],
			margin: ['responsive', 'hover', 'focus'],
			borderRadius: ['responsive', 'hover', 'focus'],
		},
	},
	plugins: [
		require('tailwindcss-ripple')(),
		require('tailwindcss-rtl'),
		require('@tailwindcss/line-clamp'),
		require('@tailwindcss/typography'),
		({ matchUtilities, theme }) => {
			matchUtilities(
				{
					ms: (value) => ({
						'[dir="ltr"] &': {
							'margin-left': value + ' !important',
							'margin-right': 0,
						},
						'[dir="rtl"] &': {
							'margin-right': value + ' !important',
							'margin-left': 0,
						},
					}),
					me: (value) => ({
						'[dir="ltr"] &': {
							'margin-right': value + ' !important',
							'margin-left': 0,
						},
						'[dir="rtl"] &': {
							'margin-left': value + ' !important',
							'margin-right': 0,
						},
					}),
				},
				{
					supportsNegativeValues: true,
					values: theme('margin'),
				}
			)
		},
		({ matchUtilities, theme }) => {
			matchUtilities(
				{
					ps: (value) => ({
						'[dir="ltr"] &': {
							'padding-left': value + ' !important',
							'padding-right': 0,
						},
						'[dir="rtl"] &': {
							'padding-right': value + ' !important',
							'padding-left': 0,
						},
					}),
					pe: (value) => ({
						'[dir="ltr"] &': {
							'padding-right': value + ' !important',
							'padding-left': 0,
						},
						'[dir="rtl"] &': {
							'padding-left': value + ' !important',
							'padding-right': 0,
						},
					}),
				},
				{
					supportsNegativeValues: true,
					values: theme('padding'),
				}
			)
		},
		({ matchUtilities, theme }) => {
			matchUtilities(
				{
					start: (value) => ({
						'[dir="rtl"] &': {
							right: value + ' !important',
							left: 'auto',
						},
						'[dir="left"] &': {
							left: value + ' !important',
							right: 'auto',
						},
					}),
					end: (value) => ({
						'[dir="rtl"] &': {
							left: value + ' !important',
							right: 'auto',
						},
						'[dir="left"] &': {
							right: value + ' !important',
							left: 'auto',
						},
					}),
				},
				{
					supportsNegativeValues: true,
					values: theme('inset'),
				}
			)
		},
		({ matchUtilities, theme }) => {
			matchUtilities(
				{
					'rounded-e': (value) => ({
						'[dir="ltr"] &': {
							borderTopRightRadius: value + ' !important',
							borderTopLeftRadius: 0,
							borderBottomRightRadius: value + ' !important',
							borderBottomLeftRadius: 0,
						},
						'[dir="rtl"] &': {
							borderTopLeftRadius: value + ' !important',
							borderTopRightRadius: 0,
							borderBottomLeftRadius: value + ' !important',
							borderBottomRightRadius: 0,
						},
					}),
					'rounded-s': (value) => ({
						'[dir="ltr"] &': {
							borderTopLeftRadius: value + ' !important',
							borderTopRightRadius: 0,
							borderBottomLeftRadius: value + ' !important',
							borderBottomRightRadius: 0,
						},
						'[dir="rtl"] &': {
							borderTopRightRadius: value + ' !important',
							borderTopLeftRadius: 0,
							borderBottomRightRadius: value + ' !important',
							borderBottomLeftRadius: 0,
						},
					}),
					'rounded-te': (value) => ({
						'[dir="rtl"] &': {
							borderTopLeftRadius: value + ' !important',
							borderTopRightRadius: 0,
						},
						'[dir="ltr"] &': {
							borderTopRightRadius: value + ' !important',
							borderTopLeftRadius: 0,
						},
					}),
					'rounded-ts': (value) => ({
						'[dir="ltr"] &': {
							borderTopLeftRadius: value + ' !important',
							borderTopRightRadius: 0,
						},
						'[dir="rtl"] &': {
							borderTopRightRadius: value + ' !important',
							borderTopLeftRadius: 0,
						},
					}),
					'rounded-be': (value) => ({
						'[dir="ltr"] &': {
							borderBottomRightRadius: value + ' !important',
							borderBottomLeftRadius: 0,
						},
						'[dir="rtl"] &': {
							borderBottomLeftRadius: value + ' !important',
							borderBottomRightRadius: 0,
						},
					}),
					'rounded-bs': (value) => ({
						'[dir="rtl"] &': {
							borderBottomRightRadius: value + ' !important',
							borderBottomLeftRadius: 0,
						},
						'[dir="ltr"] &': {
							borderBottomRightRadius: 0,
						},
					}),
				},
				{
					supportsNegativeValues: false,
					values: theme('borderRadius'),
				}
			)
		},
		({ matchUtilities, theme }) => {
			matchUtilities(
				{
					'border-s': (value) => ({
						'[dir="ltr"] &': {
							'border-left': value + ' !important',
							'border-right': 0,
						},
						'[dir="rtl"] &': {
							'border-right': value + ' !important',
							'border-left': 0,
						},
					}),
					'border-e': (value) => ({
						'[dir="ltr"] &': {
							'border-right': value + ' !important',
							'border-left': 0,
						},
						'[dir="rtl"] &': {
							'border-left': value + ' !important',
							'border-right': 0,
						},
					}),
				},
				{
					supportsNegativeValues: false,
					values: theme('borderWidth'),
				}
			)
		},
	],
}
