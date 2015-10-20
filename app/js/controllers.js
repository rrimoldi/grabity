angular
  .module('3DMatrixApp', [])
  .controller("3DMatrixAppCtrl", mainController);

//Controller
function mainController() {
  var scope = this;
  scope.validation = '';
  scope.sampleInput = '';
  scope.sampleOutput = '';

  //Show the output
  scope.getOutput = function() {
    scope.validation = '';
    scope.values = [];
    scope.sampleOutput = '';
    scope.getValues();
    scope.getResult();
  }

  //Sets de values in the scope
  scope.getValues = function() {
    scope.array = scope.sampleInput.split('\n');
    scope.t = scope.array[0];
    if(!scope.validateT()) {
      return;    
    } else {
      scope.values.push('T = ' + scope.t);
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
      } else {
        scope.values.push('N' + i + ' = ' + arrayNM[0]);
      }
      scope.m.push(arrayNM[1]);
      if(!scope.validateM()) {
        return;    
      } else {
        scope.values.push('M' + i + ' = ' + arrayNM[1]);
      }
      for(var j = 0; j < arrayNM[1]; j++) {
        scope.operations.push(scope.array[0]);
        if(!scope.validateOperations()) {
          return;
        } else {
        scope.values.push('Operations' + i + ' = ' + scope.array[0]);
      }
        scope.array.shift();
      }
      arrayNM = [];
    }
  }

  //Get the result
  scope.getResult = function() {
    for(var i = 0; i < scope.t; i ++) {
      scope.makeMatrix(i);
      for(var j = 0; j < scope.m[i]; j ++) {
        scope.doOperation(j);    
      }  
    }
  }

  //Make and initialize the matrix
  scope.makeMatrix = function(i) {
    scope.pages = []
    scope.elements = [];
    for (var x = 1; x <= scope.n[i]; x++) {
      scope.elements[x] = [];
      for (var y = 1; y <= scope.n[i]; y++) {
        scope.elements[x][y] = [];
        for (var z = 1; z <= scope.n[i]; z++) {
          scope.elements[x][y][z] = 0;
        }
      }
    }
  }

  //Operations
  scope.doOperation = function(i) {
    var arrayOperation = scope.operations[0].split(' ');
    if(arrayOperation[0] == "UPDATE") {
      var x = arrayOperation[1];
      var y = arrayOperation[2];
      var z = arrayOperation[3];
      var w = arrayOperation[4];
      scope.elements[x][y][z] = w; 
    } else if(arrayOperation[0] == "QUERY") {
      var x1 = arrayOperation[1];
      var y1 = arrayOperation[2];
      var z1 = arrayOperation[3];
      var x2 = arrayOperation[4];
      var y2 = arrayOperation[5];
      var z2 = arrayOperation[6];
      var sum = 0;
      for(var x = x1; x <= x2; x++) {
        for(var y = y1; y <= y2; y++) {
          for(var z = z1; z <= z2; z++) {
            sum += parseInt(scope.elements[x][y][z]);
          }
        }
      }
      scope.sampleOutput = scope.sampleOutput + sum.toString() + '\n';
    }
    scope.operations.shift();
  }

  scope.validateT = function() {
    if(scope.t < 1 || scope.t > 50) {
      scope.validation = "Syntax Error. Check: 1 <= T <= 50";
      return false;
    }
    return true;
  }

  scope.validateN = function() {
    for(var i = 0; i < scope.n.length; i++) {
      if(scope.n[i] < 1 || scope.n[i] > 100) {
        scope.validation = "Syntax Error. Check: 1 <= N <= 100";
        return false;   
      }
    }
    return true;
  }

  scope.validateM = function() {
    for(var i = 0; i < scope.m.length; i++) {
      if(scope.m[i] < 1 || scope.m[i] > 1000) {
        scope.validation = "Syntax Error. Check: 1 <= M <= 1000";
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
      scope.validation = "Syntax Error. Check: Methods, only update or query are acepted";
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

