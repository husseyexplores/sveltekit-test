import * as api from '$lib/api'

export async function get({ params }) {
  const { slug } = params
  const post = await api.getPost(slug)

  return {
    status: 200,
    body: post,
  }
}
