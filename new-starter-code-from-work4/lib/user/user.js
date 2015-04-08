// # User Library

// ## User Objects
function User(username, password, uid, role) {
  this.username = username;
  this.password = password;
  this.uid      = uid;
  this.role     = role;
}

// This is our stub database until we look at a real database!
var userdb = [
  new User('tim',   'mit', 1, 'admin'),
  new User('hazel', 'lezah', 2, 'lame user'),
  new User('caleb', 'belac', 3, 'small child')
];


// changes settings for given user
// used in settings view
// callback signature: cb(error, user)
exports.changeUserSettings = function(user, newRole, newPassword, newUid, cb) {
    var len = userdb.length;
    var username = user.username;
    var found = false;
    for (var i = 0; i < len; i++) {
      var u = userdb[i];
      
      if (u.username === username) {
        // found user
        if(newRole !== '' && newRole !== undefined) {
          userdb[i].role = newRole;           // change role
        }
        if(newPassword !== '' && newPassword !== undefined) {
          userdb[i].password = newPassword;   // change password
        }
        if(newUid !== '' && newUid !== undefined && !isNaN(parseInt(newUid))) {
          console.log(parseInt(newUid));
          userdb[i].uid = parseInt(newUid);
        }
        found = true;
        cb(undefined, u);
      }
    }
    
    if(found === false) {
      cb('hell froze over, invest in space heaters', undefined);
    }  
}


// add new user
// callback of signature cb(error, user)
exports.adduser = function(username, password, role, cb) {
  var len = userdb.length;
  for (var i = 0; i < len; i++) {
    var u = userdb[i];
    if (u.username === username) {
      cb('username already exists', undefined);
    }
  }
  var newUser = new User(username, password, userdb.length + 1, role);
  userdb.push(newUser);
  cb(undefined, newUser);
};


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
