const fetch = require('node-fetch')
const Provider = require('./provider')

class Danbooru extends Provider {
  constructor () {
    super([
      'SENKO', 'KANNA', 'YURI',
      'THIGH', 'THIGH_NSFW',
      'NEKO', 'NEKO_NSFW',
      'MAID', 'MAID_NSFW'
    ])
  }

  provideSenko () {
    return this._getPost('senko_(sewayaki_kitsune_no_senko-san)', [ Danbooru.SAFE ])
  }

  provideKanna () {
    return this._getPost('kanna_kamui', [ Danbooru.SAFE ])
  }

  provideYuri () {
    return this._getPost('yuri', [ Danbooru.SAFE, Danbooru.QUESTIONABLE, Danbooru.EXPLICIT ])
  }

  provideThigh () {
    return this._getPost('thighs', [ Danbooru.SAFE ])
  }

  provideThighNsfw () {
    return this._getPost('thighs', [ Danbooru.QUESTIONABLE, Danbooru.EXPLICIT ])
  }

  provideNeko () {
    return this._getPost('cat', [ Danbooru.SAFE ])
  }

  provideNekoNsfw () {
    return this._getPost('cat', [ Danbooru.QUESTIONABLE, Danbooru.EXPLICIT ])
  }

  provideMaid () {
    return this._getPost('maid', [ Danbooru.SAFE ])
  }

  provideMaidNsfw () {
    return this._getPost('maid', [ Danbooru.QUESTIONABLE, Danbooru.EXPLICIT ])
  }

  async _getPost (tag, ratings) {
    const allPosts = await fetch(`https://danbooru.donmai.us/posts.json?tags=${tag}&limit=200`).then(res => res.json())
    const posts = allPosts.filter(post => !post.is_pending && post.file_url && ratings.includes(post.rating) && !post.tag_string.split(' ').includes('trap'))
    const post = posts[Math.floor(Math.random() * posts.length)]
    return [
      post.file_url.split('.').pop(),
      await fetch(post.file_url)
    ]
  }
}

Danbooru.SAFE = 's'
Danbooru.QUESTIONABLE = 'q'
Danbooru.EXPLICIT = 'e'

module.exports = Danbooru
