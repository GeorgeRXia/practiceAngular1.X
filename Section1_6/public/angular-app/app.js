angular.module('meanhotel',['ngRoute']).config(config)

function config($routeProvider){
$routeProvider.when('/', {
  templateUrl: 'angular-app/hotel-list/hotels.html',
  controller: HotelsController,
  controllerAs: 'vm'

}).when('/hotels/:id', {
  templateUrl: 'angular-app/hotel-display/hotels.html',
  controller: HotelController,
  controllerAs: 'vm'


})

}
