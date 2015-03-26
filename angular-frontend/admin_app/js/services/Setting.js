angular.module('adminApp')
    .factory('Settings', function($http) {

        return {
            get : function() {
                return $http.get('api/settings');
            },
            show : function(id) {
                return $http.get('api/settings/' + id);
            },
            save : function(newsitemData) {
                return $http({
                    method: 'POST',
                    url: 'api/settings',
                    headers: { 'Content-Type' : 'application/x-www-form-urlencoded' },
                    data: $.param(newsitemData)
                });
            },
            destroy : function(id) {
                return $http.delete('api/settings/' + id);
            }
        }

    });