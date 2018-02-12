//this is the getter syntax because it has no empty array
angular.module('myApp').controller('AboutController', aboutController)


function aboutController(FilmFactory, $routeParams) {

  var vm = this;
  var id = $routeParams.id;
  console.log(id)
  vm.bio = "This is my bio"

//   $http service used to be in the argument
//   $http.get('http://swapi.co/api/films/' + id).then(function(response) {
// console.log(response)
//
//   vm.film = response.data
// })

FilmFactory.getOneFilm(id).then(
function(response) {
  vm.film = response;
})

}
