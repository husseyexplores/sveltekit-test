import adapterVercel from '@sveltejs/adapter-vercel';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
    // hydrate the <div id="svelte"> element in src/app.html
    adapter: adapterVercel(),
    target: '#svelte',
    prerender: {
      crawl: false,
      enabled: true,
      entries: ['/posts/1', '/posts/2']
    }
	}
};

export default config;
