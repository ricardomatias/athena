const router = require('koa-router')();

const fetch = require('isomorphic-fetch');

const BASE_URL = 'https://www.googleapis.com/books/v1/volumes?';

function encodeParams(key, query) {
  return [
    `q=${query.split(' ').join('+')}+intitle:${query.split(' ')[0]}`,
    `key=${key}`,
    'maxResults=3',
    'orderBy=relevance',
    'filter=ebooks',
    'langRestrict=en'
  ].join('&');
}

async function searchBooks(ctx) {
  const { BOOKS_KEY } = ctx.secrets;
  let { book } = ctx.params;

  book = decodeURIComponent(book);

  try {
    const params = encodeParams(BOOKS_KEY, book);
    console.log(params);
    const search = await fetch(`${BASE_URL}${params}`).then(res => res.json());

    let firstThreeResults = search.items.slice(0, 3);

    firstThreeResults = firstThreeResults.map(result => ({
      cover: result.volumeInfo.imageLinks.thumbnail,
      title: result.volumeInfo.title,
      author: (result.volumeInfo.authors || [])[0]
    }));

    ctx.body = JSON.stringify({ results: firstThreeResults });
  } catch (error) {
    error.origin = 'movies routes';

    ctx.error = {
      type: 'SEARCH_NOT_FOUND',
      message: 'Could not find any books with this title'
    };
  }
}

router.get('/search/:book', searchBooks);

module.exports = router.routes();
