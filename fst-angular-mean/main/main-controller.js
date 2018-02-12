angular.module('myApp').controller('MainController', MainController)

function MainController(FilmFactory) {
  var vm = this;
// $http service used to with this code as an argument
//   $http.get('http://swapi.co/api/films').then(function(response) {
// console.log(response)
//
//   vm.films = response.data
// })
FilmFactory.getAllFilms() .then(function(response) {
console.log(response)

  vm.films = response;
})
  vm.name = "George"

}
