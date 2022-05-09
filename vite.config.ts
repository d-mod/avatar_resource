import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import jsx from "@vitejs/plugin-vue-jsx"
import { VitePWA } from "vite-plugin-pwa"

import uno from "unocss/vite"
import { presetIcons, presetUno } from "unocss"
import { icons } from "@iconify-json/ic"

import { resolve } from "path"
import presetPalette from "unocss-preset-palette"
import { version } from "./package.json"

// https://vitejs.dev/config/
export default defineConfig({
	base: "/",
	esbuild: {
		exclude: ["node_modules/**", "dist/**"]
	},
	build: {
		emptyOutDir: false
	},
	resolve: {
		alias: {
			"@": resolve(__dirname, "./src")
		}
	},
	define: {
		__APP_VERSION__: `"${version}"`
	},
	plugins: [
		vue(),
		jsx(),
		uno({
			rules: [],
			presets: [
				presetUno(),
				presetPalette({
					colorMode: {
						attribute: "data-theme"
					},
					cssVarName(name) {
						return name
					},
					colors: {
						primary: "#4fb3ff",
						light: {
							light: "#f7f8f9",
							dark: "#1a1a1a"
						},
						dark: {
							light: "#1a1a1a",
							dark: "#f7f8f9"
						},
						neutral: {
							light: "#e3e4e5",
							dark: "#232323"
						}
					}
				}),
				presetIcons({
					prefix: "icon-",
					collections: { mdi: () => icons }
				})
			]
		}),
		VitePWA({
			registerType: "autoUpdate",
			strategies: "injectManifest",
			srcDir: "src",
			filename: "sw.ts",
			manifest: {
				name: "davatar",
				short_name: "davatar",
				icons: [
					{
						src: "icon_32.webp",
						sizes: "32x32",
						type: "images/webp"
					},

					{
						src: "icon_48.png",
						sizes: "48x48"
					},
					{
						src: "icon_128.png",
						sizes: "128x128"
					},
					{
						src: "icon_256.png",
						sizes: "256x256"
					}
				]
			}
		})
	],
	server: {
		host: "0.0.0.0",
		open: true,
		fs: {
			deny: ["dist/**"]
		},

		proxy: {
			"^/(api|icon|image|cover)/.*": {
				target: "https://davatar.gitee.io",
				changeOrigin: true
			}
		}
	}
})