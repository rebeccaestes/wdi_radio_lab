(function(){
  angular
    .module("radio")
    .directive("authNav", function($auth) {
      return {
        templateUrl: "js/nav/_auth.html",
        replace: true,
        restrict: 'E',
        link: function(scope) {
          // update scope/view on successful signin
          scope.$on('auth:login-success', function(ev, user) {
            scope.currentUser = user;
          });

          // update scope/view on succesful logout
          scope.$on('auth:logout-success', function(ev, user) {
            scope.currentUser = false;
          });

          // update scope/view on succesful signup
          scope.$on('auth:registration-email-success', function(ev, user) {
            scope.currentUser = user;
          });

          // set initial state, for currentUser, when directive is loaded
          $auth.validateUser()
            .then(function(user){
              scope.currentUser = user;
            })
            .catch(function(err){
              scope.currentUser = undefined;
            });
        }
      };
    });
})();
