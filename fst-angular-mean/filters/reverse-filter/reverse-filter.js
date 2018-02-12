

angular.module('myApp').filter('reverse', reverse)
//filters need to return a function with a parameter of string

//filters can take arguments dateSuffix($filter, arg1,arg2)
function reverse() {
  return function(string) {
    if(string){
    return string.split('').reverse().join('');
  }
  }
}
