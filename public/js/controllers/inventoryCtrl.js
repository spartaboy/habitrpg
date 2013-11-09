habitrpg.controller("InventoryCtrl", ['$scope', 'User',
  function($scope, User) {

    // convenience vars since these are accessed frequently
    $scope.userEggs = User.user.items.eggs;
    $scope.userHatchingPotions = User.user.items.hatchingPotions;
    $scope.userPets = User.user.items.pets;

    $scope.selectedEgg = null; // {index: 1, name: "Tiger", value: 5}
    $scope.selectedPotion = null; // {index: 5, name: "Red", value: 3}

    $scope.$watch('userPets + userEggs + userHatchingPotions', function(pets, eggs, pots){
      $scope.petCount = 'FIXME';
      $scope.eggCount = 'FIXME';
      $scope.potCount = 'FIXME';
    })

    $scope.chooseEgg = function(egg){
      if ($scope.selectedEgg && $scope.selectedEgg.name == egg) {
        return $scope.selectedEgg = null; // clicked same egg, unselect
      }
      var eggData = _.findWhere(window.habitrpgShared.items.items.eggs, {name:egg});
      if (!$scope.selectedPotion) {
        $scope.selectedEgg = eggData;
      } else {
        $scope.hatch(eggData, $scope.selectedPotion);
      }
    }

    $scope.choosePotion = function(potion){
      if ($scope.selectedPotion && $scope.selectedPotion.name == potion) {
        return $scope.selectedPotion = null; // clicked same egg, unselect
      }
      // we really didn't think through the way these things are stored and getting passed around...
      var potionData = _.findWhere(window.habitrpgShared.items.items.hatchingPotions, {name:potion});
      potionData = _.defaults({index:$index}, potionData);
      if (!$scope.selectedEgg) {
        $scope.selectedPotion = potionData;
      } else {
        $scope.hatch($scope.selectedEgg, potionData);
      }
    }

    $scope.sellInventory = function() {
      if ($scope.selectedEgg) {
        $scope.userEggs[$scope.selectedEgg.name]--);
        User.setMultiple({
          'items.eggs': $scope.userEggs,
          'stats.gp': User.user.stats.gp + $scope.selectedEgg.value
        });
        $scope.selectedEgg = null;
      } else if ($scope.selectedPotion) {
        $scope.userHatchingPotions.splice($scope.selectedPotion.index, 1);
        User.setMultiple({
          'items.hatchingPotions': $scope.userHatchingPotions,
          'stats.gp': User.user.stats.gp + $scope.selectedPotion.value
        });
        $scope.selectedPotion = null;
      }
    }

    $scope.hatch = function(egg, potion){
      if ($scope.userPets[egg.name+"-"+potion.name]){
        return alert("You already have that pet, hatch a different combo.")
      }
      $scope.userEggs[egg.name]--;
      $scope.userHatchingPotions[potion.name]--;
      $scope.userPets[egg.name+'-'+potion.name] = 5;

      User.log([
        { op: 'set', data: {'items.pets': User.userPets} },
        { op: 'set', data: {'items.eggs': $scope.userEggs} },
        { op: 'set', data: {'items.hatchingPotions': $scope.userHatchingPotions} }
      ]);

      alert("Your egg hatched! Visit your stable to equip your pet.");

      $scope.selectedEgg = null;
      $scope.selectedPotion = null;
    }

  }]);