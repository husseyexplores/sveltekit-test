<script context="module">
  export const prerender = true;
	/**
	 * @type {import('@sveltejs/kit').Load}
	 */
   export async function load({ page, fetch, session, stuff }) {
		const url = `https://us-central1-shop-husseyfns.cloudfunctions.net/echo`;
		const data = await fetch(url).then(r => r.json()).catch(e => null)
    console.log('\n------')
    console.log('------')
    console.log('Building About page')
    console.log('------')
    console.log('------\n')

		if (data) {
			return {
				props: {
          content: data._reqUid,
				}
			};
		}

		return {
			status: 400,
			error: new Error(`Could not load ${url}`)
		};
	}
</script>

<script>
  export let content
</script>

<h1>About</h1>
<div>
  {content}
</div>
