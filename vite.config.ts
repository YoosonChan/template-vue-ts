/// <reference types="vitest" />
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite';
import { ArcoResolver } from 'unplugin-vue-components/resolvers';

// https://vitejs.dev/config/
export default defineConfig({
  /**
   * If you are deploying to https://<USERNAME>.github.io/<REPO>/ 
   * (eg. your repository is at https://github.com/<USERNAME>/<REPO>), 
   * then set base to '/<REPO>/'.
   */
  base: '/template-vue-ts/',
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ArcoResolver()],
    }),
    Components({
      resolvers: [
        ArcoResolver({
          sideEffect: true
        })
      ]
    })
  ],
  test: {
    include: ['**/tests/**/*.spec.[tj]s']
  }
})
