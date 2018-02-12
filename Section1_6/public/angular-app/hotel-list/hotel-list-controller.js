angular.module('meanhotel').controller('HotelsController', HotelsController)

function HotelsController($http) {
  var vm = this;
  vm.title = "Mean hotel App"
//the http reauest automatically runs when you get to the route
  $http.get('/hotels/hotels').then(function(response){
    console.log(response)
    vm.hotels = response.data;
  })

}
