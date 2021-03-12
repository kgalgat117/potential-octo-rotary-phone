var obj = {
    a: {
      b: {
        c: 12
      }
    }
  };
  
  obj.findPath = function getProperty(path) {
    var tokens = path.split(".");
    var obj1 = obj;
    var flag = true
    main: for (var i = 0; i < tokens.length; i++) {
      if (obj1[tokens[i]]) {
        obj1 = obj1[tokens[i]];
      } else {
        flag = false
        break main;
      }
    }
    if (flag) {
      return obj1;
    } else {
      return undefined
    }
  }
  
  
  
  
  console.log(obj.findPath('a.b.c')); // 12
  console.log(obj.findPath('a.b')); // {c: 12}
  console.log(obj.findPath('a.b.d')); // undefined
  console.log(obj.findPath('a.c')); // undefined
  console.log(obj.findPath('a.b.c.d')); // undefined
  console.log(obj.findPath('a.b.c.d.e')); // undefined
  