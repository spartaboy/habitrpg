habitrpg.controller("PetsCtrl", ['$scope', 'User',
  function($scope, User) {

    $scope.userPets = User.user.items.pets;
    $scope.userCurrentPet = User.user.items.currentPet;
    $scope.eggs = window.habitrpgShared.items.items.eggs;
    $scope.hatchingPotions = window.habitrpgShared.items.items.hatchingPotions;
    $scope.totalPets = _.size($scope.pets) * _.size($scope.hatchingPotions);

    $scope.choosePet = function(name, potion){
      var pet = name+'-'+potion;
      if($scope.userCurrentPet && $scope.userCurrentPet == pet){
        $scope.userCurrentPet = null;
      }else{
        $scope.userCurrentPet = pet;
      }
      User.set('items.currentPet', $scope.userCurrentPet);
    }

  }]);