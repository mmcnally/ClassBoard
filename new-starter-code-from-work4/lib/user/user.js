// # User Library

// ## User Objects
function User(username, password, uid) {
  this.username = username;
  this.password = password;
  // Added uid
  this.uid      = uid;
}

// This is our stub database until we look at a real database!
var userdb = [
  new User('tim',   'mit', 1),
  new User('hazel', 'lezah', 2),
  new User('caleb', 'belac', 3)
];

//
// ## lookup function
// locates a user by `name` if it exists. Invokes callback `cb` with the
// signature cb(error, userobj).
//
exports.lookup = function(username, password, cb) {
  var len = userdb.length;
  for (var i = 0; i < len; i++) {
    var u = userdb[i];
    if (u.username === username) {
      if (u.password === password) {
        cb(undefined, u);
      }
      else {
        cb('password is not correct');
      }
      return;
    }
  }
  cb('user not found');
};

