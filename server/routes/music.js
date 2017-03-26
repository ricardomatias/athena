const router = require('koa-router')();

const fetch = require('isomorphic-fetch');

const BASE_URL = 'http://ws.audioscrobbler.com/2.0/?method=artist.search&';

function encodeParams(key, query) {
  return [
    `artist=${query}`,
    `api_key=${key}`,
    'format=json'
  ].join('&');
}

async function searchMusic(ctx) {
  const { music } = ctx.params,
        { MUSIC_KEY } = ctx.secrets;

  try {
    const params = encodeParams(MUSIC_KEY, decodeURIComponent(music));

    const search = await fetch(`${BASE_URL}${params}`).then(res => res.json());

    let firstThreeResults = search.results.artistmatches.artist.slice(0, 3);

    firstThreeResults = firstThreeResults.map((result) => {
      let picture;

      for (picture of result.image) {
        if (picture.size === 'large') {
          picture = picture['#text'];
          break;
        }
      }

      return {
        picture,
        artist: result.name
      };
    });

    ctx.body = JSON.stringify({ results: firstThreeResults });
  } catch (error) {
    error.origin = 'movies routes';

    ctx.error = {
      type: 'SEARCH_NOT_FOUND',
      message: 'Could not find any artists with this name'
    };
  }
}

router.get('/search/:music', searchMusic);

module.exports = router.routes();
