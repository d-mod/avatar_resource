import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import jsx from "@vitejs/plugin-vue-jsx"
import { VitePWA } from "vite-plugin-pwa"

import uno from "unocss/vite"
import presetDefault from "@unocss/preset-uno"
import presetIcons from "@unocss/preset-icons"

import { resolve } from "path"

// https://vitejs.dev/config/
export default defineConfig({
    base: "/",
    build: {
        emptyOutDir: false
    },
    resolve: {
        alias: {
            "@": resolve(__dirname, "./src")
        }
    },
    plugins: [
        vue(),
        jsx(),
        uno({
            presets: [presetDefault(), presetIcons()]
        }),
        VitePWA({
            registerType: "autoUpdate",
            injectRegister: "script",
            manifest: {
                name: "davatar",
                short_name: "davatar"
            }
        })
    ],
    server: {
        host: "0.0.0.0",
        open: true,
        proxy: {
            "^/(api|icon|image|cover)/.*": {
                target: "https://davatar.gitee.io",
                changeOrigin: true
            }
        }
    }
})
