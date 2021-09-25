<script context="module">
	/**
	 * @type {import('@sveltejs/kit').Load}
	 */
   export async function load({ page, fetch, session, stuff }) {
		const url = `https://us-central1-shop-husseyfns.cloudfunctions.net/echo`;
		const data = await fetch(url, {
      credentials: 'omit',
    }).then(r => r.json()).catch(e => null)

		if (data) {
			return {
				props: {
          body: data._reqUid,
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
  export let body
</script>

<h1>Uncached</h1>

<div style="font-family: monospace; margin: 10px 0;">
  <p>Prendered = false (was not pre-rendered during build phase)</p>
  <p>maxage = not defined (Hoping to serve fresh data every times this page is requested)</p>
</div>

<hr>
<p>
  The following data <em>should</em> change upon every page refresh
</p>

<div class="cw">
  <p class="c">{body}</p>
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
