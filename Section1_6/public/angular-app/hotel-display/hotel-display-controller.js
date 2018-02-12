angular.module('meanhotel').controller("HotelController", HotelController);
//the unquoted HotelContoller is the one that is naming it
function HotelController(hotelDataFactory, $routeParams) {
  var vm = this;
  var id = $routeParams.id;
  console.log(id)

  hotelDataFactory.hotelDisplay(id).then(function(response) {
    vm.hotel = response;

  })



}
