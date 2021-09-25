<script context="module">
  export const prerender = true;
	/**
	 * @type {import('@sveltejs/kit').Load}
	 */
   export async function load({ page, fetch, session, stuff }) {
		const url = `https://us-central1-shop-husseyfns.cloudfunctions.net/echo`;
		const data = await fetch(url).then(r => r.json()).catch(e => null)

		if (data) {
			return {
				props: {
					post: {
            title: `${page.params.slug}`,
            body: data._reqUid,
          }
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
  export let post
</script>

<h1>Post: {post.title}</h1>
<div class="post-body">
  {post.body}
</div>
