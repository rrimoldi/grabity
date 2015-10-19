angular
  .module('3DMatrixApp', [])
  .controller("3DMatrixAppCtrl", mainController);

function mainController() {
  var scope = this;
  scope.validation = '';
  scope.sampleInput = '';
  scope.sampleOutput = '';

  scope.getOutput = function() {
    scope.getValues();
  }

  //setea todos los valores en el scope ingresados en el input
  scope.getValues = function() {
    scope.array = scope.sampleInput.split('\n');
    scope.t = scope.array[0];
    if(!scope.validateT()) {
      return;    
    }
    scope.array.shift();
    var arrayNM = [];
    scope.n = [];
    scope.m = [];
    scope.operations = [];

    for(var i = 0; i < scope.t; i++) {
      arrayNM = scope.array[0].split(' ');
      scope.array.shift();
      scope.n.push(arrayNM[0]);
      if(!scope.validateN()) {
        return;    
      }
      scope.m.push(arrayNM[1]);
      if(!scope.validateM()) {
        return;    
      }
      for(var j = 0; j < arrayNM[1]; j++) {
        scope.operations.push(scope.array[0]);
        scope.array.shift();
      }
      arrayNM = [];
    }
  }

  scope.validateT = function() {
    if(scope.t < 1 || scope.t > 50) {
      scope.validation = "1 <= T <= 50";
      return false;
    }
  }

  scope.validateN = function() {
    for(var i = 0; i < scope.n.length; i++) {
      if(scope.n[i] < 1 || scope.n[i] > 100) {
        scope.validation = "1 <= N <= 100";
        return false;   
      }
    }
  }

  scope.validateM = function() {
    for(var i = 0; i < scope.m.length; i++) {
      if(scope.m[i] < 1 || scope.m[i] > 1000) {
        scope.validation = "1 <= M <= 1000";
        return  false;   
      }
    }
  }
    for(var z = 0; z < scope.operations.length; z++) {
      if(scope.operations[j] < 1 || scope.m[j] > 1000) {
        scope.validation = "1 <= M <= 1000";
        return;   
      }
    }
  }
};