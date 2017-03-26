const router = require('koa-router')();

const fetch = require('isomorphic-fetch');

const BASE_URL = 'https://api.themoviedb.org/3/search/movie?';

function encodeParams(key, query) {
  return [
    `query=${query}`,
    `api_key=${key}`,
    'language=en-US',
    'include_adult=false'
  ].join('&');
}

async function searchMovie(ctx) {
  const { movie } = ctx.params;

  try {
    const params = encodeParams(ctx.secrets.MOVIES_KEY, decodeURIComponent(movie));

    const search = await fetch(`${BASE_URL}${params}`).then(res => res.json());

    let firstThreeResults = search.results.slice(0, 3);

    firstThreeResults = firstThreeResults.map((result) => {
      let poster = '';

      if (result.poster_path) {
        poster = `https://image.tmdb.org/t/p/w500${result.poster_path}`;
      }

      return {
        poster,
        title: result.original_title
      };
    });

    ctx.body = JSON.stringify({ results: firstThreeResults });
  } catch (error) {
    error.origin = 'movies routes';

    ctx.error = {
      type: 'SEARCH_NOT_FOUND',
      message: 'Could not find any movies with this title'
    };
  }
}

router.get('/search/:movie', searchMovie);

module.exports = router.routes();
