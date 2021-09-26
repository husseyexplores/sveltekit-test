import { randomInt } from '$lib/utils'

export function getPost(slug) {
  return fetch(`https://us-central1-shop-husseyfns.cloudfunctions.net/echo
  `)
    .then(r => r.json())
    .then(r => {
      return {
        title: `Post: ${slug}`,
        body: r._reqUid,
        int: randomInt(500, 5000),
      }
    })
}
