angular.module('myApp').filter('dateSuffix', dateSuffix)
//filters can take arguments dateSuffix($filter, arg1,arg2)
function dateSuffix($filter) {
  var suffixes = ['th', 'st', 'nd', 'rd']
    return function (string){
      if(string){
        var dtfilter = $filter('date')(string, 'dd MMMM yyy @ H:m:s');

        var day = parseInt(dtfilter.substr(0,2))
        var relevantDigits = (day < 3)
      }
    }



}
