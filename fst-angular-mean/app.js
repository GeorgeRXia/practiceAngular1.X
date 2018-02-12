
//empty array is for dependies and it also declars this is a module setter
angular.module('myApp', ['ngRoute']).config(config);


//$routeProvider is a services
function config($routeProvider) {
  $routeProvider.when('/', {
    templateUrl: 'main/main.html',
    controller: 'MainController',
    //specifying your controller here means you don't need to use ng-contoller in your html file
    controllerAs: 'vm'

  }).when('/about/:id', {
    templateUrl: 'about/about.html',
    controller: 'AboutController',
    controllerAs: 'vm'
  }).otherwise({
    redirectTo: '/'
  });


}
 // template: '<h1> this is the about page </h1>'
