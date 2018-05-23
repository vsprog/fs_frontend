module.exports = {
  searchMovies: {
    path: '/api/search',
    method: 'GET',
  },

  fetchBookmarks: {
    path: '/api/bookmarks',
    method: 'GET',
  },

  fetchBookmark: {
    path: '/api/bookmarks/:imdbID',
    method: 'GET',
  },

  addMovie: {
    path: '/api/search',
    method: 'POST',
  },

  addBookmark: {
    path: '/api/bookmark',
    method: 'POST',
  },
  /*
  updateMovie: {
    path: '/api/search/:id',
    method: 'PATCH',
  },
*/
  deleteMovie: {
    path: '/api/search/:imdbID',
    method: 'DELETE',
  },

  deleteBookmark: {
    path: '/api/bookmarks/:imdbID',
    method: 'DELETE',
  },
};
