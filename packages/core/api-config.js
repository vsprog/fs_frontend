module.exports = {
  getMovies: {
    path: '/search',
    method: 'GET',
  },

  fetchMovies: {
    path: '/bookmarks',
    method: 'GET',
  },

  fetchMovie: {
    path: '/bookmarks/:imdbID',
    method: 'GET',
  },

  addMovie: {
    path: '/search/:imdbID',
    method: 'POST',
  },
/*
  updateMovie: {
    path: '/api/v001/tasks/:id',
    method: 'PATCH',
  },
*/
  deleteMovie: {
    path: '/search/:imdbID',
    method: 'DELETE',
  },

  deleteBookmark: {
    path: '/bookmarks/:imdbID',
    method: 'DELETE',
  },
};
