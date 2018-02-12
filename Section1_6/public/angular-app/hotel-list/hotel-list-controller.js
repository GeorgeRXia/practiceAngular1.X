angular.module('meanhotel').controller('HotelsController', HotelsController)

function HotelsController(hotelDataFactory) {
  var vm = this;
  vm.title = "Mean hotel App"
//the http reauest automatically runs when you get to the route
  hotelDataFactory.hotelList().then(function(response){
    console.log(response)
    vm.hotels = response;
  })

}
