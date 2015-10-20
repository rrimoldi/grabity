angular
  .module('3DMatrixApp', [])
  .controller("3DMatrixAppCtrl", mainController);

function mainController() {
  var scope = this;
  scope.validation = '';
  scope.sampleInput = '';
  scope.sampleOutput = '';

  scope.getOutput = function() {
    scope.validation = '';
    scope.getValues();
    scope.getResult();
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
        if(!scope.validateOperations()) {
          return;
        }
        scope.array.shift();
      }
      arrayNM = [];
    }
  }

  scope.getResult = function() {
    scope.makeMatrix();
  }

  scope.makeMatrix = function() {
    console.log(scope.n[0]);
    scope.pages = []
    var elements = [];
    for (var x = 0; x < scope.n[0]; x++) {
      elements[x] = [];
      for (var y = 0; y < scope.n[0]; y++) {
        elements[x][y] = [];
        for (var z = 0; z < scope.n[0]; z++) {
          elements[x][y][z] = 0;  
        }
      }
    }
    console.log(elements[1][2][3]); 
  }

  scope.validateT = function() {
    if(scope.t < 1 || scope.t > 50) {
      scope.validation = "1 <= T <= 50";
      return false;
    }
    return true;
  }

  scope.validateN = function() {
    for(var i = 0; i < scope.n.length; i++) {
      if(scope.n[i] < 1 || scope.n[i] > 100) {
        scope.validation = "1 <= N <= 100";
        return false;   
      }
    }
    return true;
  }

  scope.validateM = function() {
    for(var i = 0; i < scope.m.length; i++) {
      if(scope.m[i] < 1 || scope.m[i] > 1000) {
        scope.validation = "1 <= M <= 1000";
        return  false;   
      }
    }
    return true;
  }

  scope.validateOperations = function() {
    var arrayOperation = scope.array[0].split(" ");
    if(arrayOperation[0] == "UPDATE") {
      if(!scope.validateUpdate()) {
        return false;
      }
    } else if(arrayOperation[0] == "QUERY") {
      if(!scope.validateQuery()) {
        return false;
      }
    } else {
      scope.validation = "Only method update or query are acepted";
      return false;
    }
    return true;    
  }

  scope.validateUpdate = function() {
    var arrayOperation = scope.array[0].split(" ");
    if(arrayOperation[1] < 0 || arrayOperation[1] > scope.n) {
      scope.validation = "1 <= x <= N";
      return false;
    }
    if(arrayOperation[2] < 0 || arrayOperation[2] > scope.n) {
      scope.validation = "1 <= y <= N";
      return false;
    }
    if(arrayOperation[3] < 0 || arrayOperation[3] > scope.n) {
      scope.validation = "1 <= z <= N";
      return false;
    }
    if(arrayOperation[4] < 0.000000001 || arrayOperation[3] > 1000000000) {
      scope.validation = "0.000000001 <= W <= 1000000000";
      return false;
    }
    return true;
  }  

  scope.validateQuery = function() {
    var arrayOperation = scope.array[0].split(" ");
    if(arrayOperation[1] < 0 || arrayOperation[1] > arrayOperation[4] || arrayOperation[4] > scope.n) {
      scope.validation = "1 <= x1 <= x2 <= N";
      return false;
    }
    if(arrayOperation[2] < 0 || arrayOperation[2] > arrayOperation[5] || arrayOperation[5] > scope.n) {
      scope.validation = "1 <= y1 <= y2 <= N";
      return false;
    }
    if(arrayOperation[3] < 0 || arrayOperation[3] > arrayOperation[6] || arrayOperation[6] > scope.n) {
      scope.validation = "1 <= z1 <= z2 <= N";
      return false;
    }
    return true;
  } 
};

