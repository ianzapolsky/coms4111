/**
 * javascript for the Schedule Buddy login form
 * ian zapolsky - 4/4/14
 */

var sb_login = function() {

  var
    unames = [],
    pwords = [], 
    
    // methods
    init, printError, checkInput, getUsers;

  // ajax method to grab all the users from the backend
  getUsers = function () {
    $.ajax({
      url: 'api/get_users.php',
      type: 'GET',
      async: true,
      dataType: 'json',
      success: function (data) {
        for (var i = 0; i < data.length; i++) {
          unames[i] = data[i].USERNAME;
          pwords[i] = data[i].PASSWORD; 
        }
      }
    });
  };

  // update p element with an error message
  printError = function () {
    $( '#username' ).addClass('invalid');
    $( '#username' ).val('Invalid combo');
    $( '#password' ).addClass('invalid');
    $( '#password' ).val('');
  };

  // clean and check the input from our form
  checkInput = function (event) {
    var 
      uname = $( '#username' ).val(),
      pword = $( '#password' ).val(),
      is_user = false;

    for (var i = 0; i < unames.length; i++) {
      if (unames[i] === uname && pwords[i] === pword) {
        is_user = true;
        break;
      }
    }

    if (is_user === false) {
      event.preventDefault();
      printError();
    }
  };

  // init method: grab all users, and set f
  init = function ($form) {
    console.log('was initialized!');
    getUsers();
    $form.submit(function (event) {
      checkInput(event);
    });
  };
  
  return { init : init };

}();
    
    
      
      
    


  

    
   
  
    
