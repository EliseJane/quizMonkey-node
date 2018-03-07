const ObjectId = require('mongodb').ObjectId;
exports.stringToObjectId = (id) => {
  return new ObjectId(id);
}

exports.stringIDToObjectId = (arr, filedName) => {
  return arr.map(o => {
    if(o.hasOwnProperty(filedName)) {
      o[filedName] = new ObjectId(o[filedName]);
      return o;
    }
    return o;
  });
}
