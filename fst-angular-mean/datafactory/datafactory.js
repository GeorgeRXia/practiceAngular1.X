angular.module('myApp').factory('FilmFactory', FilmFactory)

function FilmFactory($http) {
  return {
    getAllFilms: getAllFilms,
    getOneFilm: getOneFilm


  }
  function getAllFilms() {
    return $http.get('http://swapi.co/api/films').then(complete).catch(failed)
  }
  function getOneFilm(id) {
    return $http.get('http://swapi.co/api/films/' + id).then(complete).catch(failed);

  }

  function complete(response) {

      return response.data
  }
  function failed(error) {

      return error.status.Text
  }
}
