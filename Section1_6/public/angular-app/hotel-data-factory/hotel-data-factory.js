angular.module('meanhotel').factory('hotelDataFactory',hotelDataFactory);


function hotelDataFactory($http) {
  return {hotelList: hotelList,
    hotelDisplay: hotelDisplay
  }
  function hotelList() {
    return $http.get('/hotels/hotels').then(complete).catch(failed);

  }

  function hotelDisplay(id) {
    return $http.get('hotels/hotels/' + id).then(complete).catch(failed);

  }

  function complete(response) {
    return response.data;

  }

  function failed(error) {
    return error.statusText

  }
}
