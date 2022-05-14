module.exports = {
	purge: [],
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
	],
}
