/** @type {import('tailwindcss').Config} */
export default {
	content: [
		"./index.html",
		"./src/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		fontFamily:{
			"inter": ["Inter", "sans-serif"],
		},
		extend: {
			colors:{
				description: "#8A8AA3",
				grey:{
					50: "#F7F7F8",
					100: "#EBEBEF",
					200: "#D1D1DB",
					400 : "#3F3F50"
				},
				blue: {
					1000: "#14003D"
				},
				purple: {
					50: "#F4F1FD",
					200: "#7047EB"
				},
				pink: {
					700: "#FE5BAC"
				}

			},
		},
	},
	plugins: [
	],
}
