var express = require('express');
var router = express.Router();

var userlib = require('../lib/user');

// A logged in "database":
var online = {};

// # User Server-Side Routes

// ## login
// Provides a user login view.
router.get('/login', function(req, res){
  // Grab any messages being sent to use from redirect.
  var authmessage = req.flash('auth') || '';

  // TDR: redirect if logged in:
  var user  = req.session.user;

  // TDR: If the user is already logged in - we redirect to the
  // main application view. We must check both that the `userid`
  // and the `online[userid]` are undefined. The reason is that
  // the cookie may still be stored on the client even if the
  // server has been restarted.
  if (user !== undefined && online[user.uid] !== undefined) {
    res.redirect('/user/main');
  }
  else {
    // Render the login view if this is a new login.
    res.render('login', { title   : 'ClassBoard',
                          message : authmessage });
  }
});

// ## auth
// Performs **basic** user authentication.
router.post('/auth', function(req, res) {
  // redirect if logged in:
  var user = req.session.user;

  // do the check as described in the `exports.login` function.
  if (user !== undefined && online[user.uid] !== undefined) {
    res.redirect('/user/main');
  }
  else {
    // Pull the values from the form.
    var username = req.body.username;
    var password = req.body.password;
    // Perform the user lookup.
    userlib.lookup(username, password, function(error, user) {
      if (error) {
        // If there is an error we "flash" a message to the
        // redirected route `/user/login`.
        req.flash('auth', error);
        res.redirect('/user/login');
      }
      else {
        req.session.user = user;
        // Store the user in our in memory database.
        online[user.uid] = user;
        // Redirect to main.
        res.redirect('/user/main');
      }
    });
  }
});


// ## logout
// Deletes user info & session - then redirects to login.
router.get('/logout', function(req, res) {
  var user = req.session.user;
  if (user === undefined || online[user.uid] === undefined) {
    req.flash('auth', 'Not logged in!');
    res.redirect('/user/login');
    return;
  }

  if (online[user.uid] !== undefined) {
    delete online[user.uid];
  }

  delete req.session.user;
  res.redirect('/user/login');
});


router.get('/signUp', function(req, res) {
  var user = req.session.user;
  var authmessage = req.flash('auth') || '';
  
  res.render('signUp', { title     : 'Create New User',
                         subtitle  : 'Create New User Below',
                         message   :  authmessage });
});  


// called when update button pressed in settings view
router.post('/updateSettings', function(req, res) {
  var user = req.session.user;
  if (user === undefined || online[user.uid] === undefined) {
    req.flash('auth', 'Not logged in!');
    res.redirect('/user/login');
  }
  else {
    var username = user.username || '';
    var newRole = req.body.role || '';
    var newPassword = req.body.password || '';
    var newUid = req.body.uid || '';
    
    userlib.changeUserSettings(user, newRole, newPassword, newUid, function(error, newUser) {
      if(error) {
        req.flash('auth', error);
        res.redirect('/user/settings');
      }
      else {
        req.flash('auth', 'role changed super well, be impressed');
        // update user information
        delete online[user.uid];
        online[newUser.uid] = newUser;
        req.session.user = newUser;
        res.redirect('/user/settings');
      }
    });
  }
  
});


// load settings view
router.get('/settings', function(req, res) {
  var user = req.session.user;
  
  if (user === undefined || online[user.uid] === undefined) {
    req.flash('auth', 'Not logged in!');
    res.redirect('/user/login');
  }
  else {
    var authmessage = req.flash('auth') || '';
    
    var role = user.role || 'normal'
    var password = user.password || 'no password';
    var uid = user.uid || '';
    
    res.render('settings', { title    : 'Settings',
                             subtitle : 'nobody likes subtitles',
                             role     : role,
                             password : password,
                             uid      : uid,
                             message  : authmessage });
  }
});
  
  
// called from signUp.ejs when creating class
// adds user to 
router.post('/createUser', function(req, res) {
  var username = req.body.username;
  var password = req.body.password;
  var role     = '';
  
  userlib.adduser(username, password, role, function(error, user) {
    if (error) {
      req.flash('auth', error);
      res.redirect('/user/signUp');
    }
    else {
      if(user !== undefined) {
        req.flash('auth', 'User Successfully Added! YAY HIGH FIVE ^_^/');
        res.redirect('/user/signUp');
      }
      else {
        // something done messed up
        req.flash('auth', 'you did something terrible, go sit in a corner and repent');
        res.redirect('/user/signUp');
      }
    }
  });
  // }
});

// ## main
// The main user view.
router.get('/main', function(req, res) {
  // added session support
  var user = req.session.user;
  if (user === undefined || online[user.uid] === undefined) {
    req.flash('auth', 'Not logged in!');
    res.redirect('/user/login');
  }
  else {
    res.render('main', { title   : 'User Main',
                         message : 'Login Successful',
                         username : user.username,
                         password : user.password });
  }
});

router.get('/online', function(req, res) {
  res.render('online', { title : 'Users Online',
                         users : online });
});

module.exports = router;
