# PROJECT

## Installation(yarn)

### Create project with Vite

#### [Using vue-ts template](https://vitejs.dev/guide/)

```sh
yarn create vite PROJECT_NAME --template vue-ts
cd PROJECT_NAME
```

### Install UI frameworks

> Vue version >= 3.2.0

#### [Install Arco Design](https://arco.design/vue/docs/start)

##### Install

```sh
yarn add --dev @arco-design/web-vue
```

##### On-demand Import

```sh
yarn add --dev unplugin-vue-components unplugin-auto-import 
```

Edit `vite.config.ts` file:

```ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite';
import { ArcoResolver } from 'unplugin-vue-components/resolvers';

// https://vitejs.dev/config/
export default defineConfig({
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
  ]
});
```

#### [Install Tailwind CSS](https://tailwindcss.com/docs/guides/vite#vue)

##### Install Tailwind CSS

```sh
yarn add --dev tailwindcss postcss autoprefixer
yarn tailwindcss init -p
```

##### Configure the template paths

`tailwind.config.js` file:

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

##### Add the Tailwind directives to your CSS

`./src/style.css` file:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### [Install Vika](https://developers.vika.cn/api/fusion-api-v3#javascript-sdk)

```sh
yarn add @vikadata/vika
```

> [Get token](https://vika.cn/management/overview): User Profile -> My Setting -> Developer -> API Token -> Copy
>
> [Document](https://developers.vika.cn/api/get-records)

## Install dependencies

```sh
yarn
```

## Test whether it is executable

```sh
yarn dev
```

## Build project

```sh
yarn build
```

## Install Test Tool

### [Vitest](https://cn.vitest.dev/guide/)

#### Installation

```sh
yarn add -D vitest
```

#### [Configuration](https://cn.vitest.dev/config/#include)

- `package.json`:

```json
{
  "scripts": {
    "test": "vitest"
  }
}
```

- [`vite.config.ts`](https://cn.vitest.dev/guide/#%E9%85%8D%E7%BD%AE-vitest)

To update the `vite.config.ts` file, and add a `test` configuration. According to the [`include` configuration](https://github.com/vitejs/vite/blob/0c0aeaeb3f12d2cdc3c47557da209416c8d48fb7/vitest.config.ts) of the `tests` object, we need to create a folder named `tests` in the root path.

```ts
/// <reference types="vitest" />
import { defineConfig } from 'vite'

export default defineConfig({
  test: {
    include: ['**/tests/**/*.spec.[tj]s']
  }
})
```

#### Verify availability

- To creat a `*.spec.ts` file:

```ts
import { expect, test } from 'vitest'

test('adds 1 + 2 to equal 3', () => {
  expect(1 + 2).toBe(3)
})
```

- Run test

```sh
yarn test
```

## [Deploying a staic site](https://vitejs.dev/guide/static-deploy.html#github-pages)

### Github pages

#### Config `base` value in the `vite.config.ts` file

```ts
export default defineConfig({
  base: '/template-vue-ts/',
})
```

#### Create a `deploy.yml` file for github page

the `.github/workflows/deploy.yml` file:

```yml
# Simple workflow for deploying static content to GitHub Pages
name: Deploy static content to Pages

on:
  # Runs on pushes targeting the default branch
  push:
    branches: ["main"]

  # Allows you to run this workflow manually from the Actions tab
  workflow_dispatch:

# Sets the GITHUB_TOKEN permissions to allow deployment to GitHub Pages
permissions:
  contents: read
  pages: write
  id-token: write

# Allow one concurrent deployment
concurrency:
  group: "pages"
  cancel-in-progress: true

jobs:
  # Single deploy job since we're just deploying
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      - name: Set up Node and Install dependencies
        uses: actions/setup-node@v3
        with:
          node-version: 18
          cache: "npm"
      - run: npm install --global yarn
      - run: yarn
      - name: Build
        run: yarn build
      - name: Setup Pages
        uses: actions/configure-pages@v3
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v2
        with:
          # Upload dist repository
          path: "./dist"
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v2
```
