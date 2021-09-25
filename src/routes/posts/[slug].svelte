<script context="module">
  export const prerender = true;

	/**
	 * @type {import('@sveltejs/kit').Load}
	 */
   export async function load({ page, fetch, session, stuff }) {
    const { slug } = page.params
		const url = `https://us-central1-shop-husseyfns.cloudfunctions.net/echo`;
		const data = await fetch(url).then(r => r.json()).catch(e => null)
    console.log('\n------')
    console.log('Building post', slug)
    console.log('------\n')

		if (data) {
			return {
				props: {
					post: {
            title: slug,
            body: data._reqUid,
          },
				},
        maxage: 'public'
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

  const isPrerendered = ['1', '2'].some(id => id == post.title)
</script>

<h1>Post: {post.title}</h1>

<div style="font-family: monospace; margin: 10px 0;">
  <p>Prendered = {isPrerendered.toString()} {isPrerendered ?
  '(was pre-rendered during build phase)' :
  '(was not pre-rendered during build phase)'}</p>
  <p>maxage = public {!isPrerendered ?
  '(hoping to build this once the request comes and cache it for subsequent requests)' :
  ''}</p>
</div>

{#if isPrerendered}
<p>This post was pre-rendered during the build phase</p>
{:else}
<p>This post wa</p>
{/if}

<div class="cw">
  <p class="c">{post.body}</p>
</div>

<style>
  .cw { margin-top: 20px; }
  .c {
    display: inline-block;
    background: rgb(22, 22, 22);
    color: rgb(245, 245, 245);
    padding: 10px 20px;
    font-family: monospace;
  }
</style>

