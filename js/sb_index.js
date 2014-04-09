/**
 * sb_index.js
 * js for schedule buddy index
 * COMS 4111
 *
 * April 10, 2014
 */

var sb_index = function () {

  var
    // username of the logged-in user for use in api calls
    username,
    // list of buddies of the logged-in user
    buddies = [],
    // list of schedules of the logged-in user
    schedules = [],
    // list of commitments for the currently viewed schedule
    commitments = [],
    // list of users
    users = [],

  // methods
  init, convertDay, onHashChange, changePage,
  // ajax
  getBuddies, getSchedules, getCommitments,
  // these are all the pages we would like to implement
    showLandPage, showBuddyPage, showAddBuddyPage, showScheduleSelectPage, showSchedulePage;

  showLandPage = function () {
    var html = String()
        + '<div class="jumbotron">'
          + '<h1><a href="#">ScheduleBuddy</a></h1>'
          + '<h3>Welcome, '+username+'!</p>'
          + '<ul>'
            +'<li><a href="#buddies">Buddies</a></li>'
            +'<li><a href="#schedules">Schedules</a></li>'
          + '</ul>'
        + '</div>'
    // update the main page with land page html
    $( '#main' ).html(html);
  };

    showBuddyPage = function () {
	var html = String() 
      + '<div class="jumbotron">'
      + '<h3>Your Buddies</h3><br>'
      + '<p class="text-right"><a href="#addbuddy" type="button" class="btn btn-default">Add Buddy</a></p>'
      + '<div class="panel panel-default">'
        + '<div class="panel-body">'
	+ '<table class="table table-hover"><thead>'
	+ '<colgroup><col class="col-xs-1"><col class="col-xs-7"><col class="col-xs-1"></colgroup>'
        + ' <tr>'
            + '<th>#</th>'
            + '<th>Username</th>'
	    + '<th> </th>'
        + ' </tr>'
            + '</thead> <tbody>';
	for (var i = 0; i < buddies.length; i++){
	    html += '<tr><td>' + (i+1) + '</td> <td>' + buddies[i].USERNAME+'</td><td>';
	    html += '<div class="btn-group"><button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown">Options <span class="caret"></span></button>';
	    html += '<ul class="dropdown-menu" role="menu">';
	    html += '<li><a href="#">View Schedule</a></li>';
	    html += '<li><a href="#">Send Invite</a></li>';
	    html += '<li class="divider"></li>';
	    html += '<li><a href="#">Delete Buddy</a></li>';
	    html += '</ul></div></td></tr>';
	}
	html += '</tbody></table></div></div>';
	html += '<a href="#" class="btn btn-lg btn-default">&lArr; Go Back</a></div>';
    
    // update the main page with buddy page html
	$( '#main' ).html(html);
    };

    showAddBuddyPage = function () {
	var html = String() 
      + '<div class="jumbotron">'
      + '<h3>Add Buddies</h3><br>'
	+ '<p class="text-right">'
	+ '<input type="text" class="form-control">'
	+ '<span class="input-group-btn"><button class="btn btn-default" type="button">Search User</button></span>'
	+ '<!-- /.row --></p>'
      + '<br><div class="panel panel-default">'
        + '<div class="panel-body">'
	+ '<table class="table table-hover"><thead>'
	+ '<colgroup><col class="col-xs-1"><col class="col-xs-7"><col class="col-xs-1"></colgroup>'
        + ' <tr>'
            + '<th>#</th>'
            + '<th>Username</th>'
	    + '<th> </th>'
        + ' </tr>'
            + '</thead> <tbody>'
	    + '<form id="add-buddy" method="post" role="form">';
	for (var i = 0; i < users.length; i++){
	 
	    html += '<tr><td>' + (i+1) + '</td> <td>' + users[i].USERNAME+'</td><td>';
            html += '<input type="hidden" id="buddy" value="'+ users[i].USERNAME +'">';
	    html += '<input type="submit" value="Add Buddy" class="btn btn-default">';
	    html += '</td></tr>';
	}
	html += '</form></tbody></table></div></div>';
	html += '<a href="#" class="btn btn-lg btn-default">&lArr; Go Back</a></div>';
    
	// update the main page with buddy page html
	$( '#main' ).html(html);

    // hook create user form to backend
	$( '#add-buddy' ).submit(function (event) {
	    alert("add buddy!");
	    createBuddy(event);
	});
      };
    
  // ajax method to POST a new buddy to the backend
    createBuddy = function (event) {
	alert("inside create buddy");
	var 
	username1 = username,
	username2 = $( '#buddy' ).val(),
	buddy = {'USERNAME1': username1, 'USERNAME2': username2};

	event.preventDefault();
	$.ajax({
	    url: 'api/post_buddy.php',
	    type: 'POST',
	    data: buddy,
	    async: false,
	    dataType: 'json',
	});
    
	alert(username2 + " is now a buddy!");
    // after user is created, reload ajax user data to reflect change, and
    // move back to the land page
	getBuddies();
	window.location.hash = '#buddies';
    };

    showScheduleSelectPage = function () {
    var html = String() 
      + '<div class="jumbotron">'
      + '<h3>Your Schedules</h3><br>'
      + '<p class="text-right"><a href="#addbuddy" type="button" class="btn btn-default">Add Schedule</a></p>'
      + '<div class="panel panel-default">'
        + '<div class="panel-body">'
	+ '<table class="table table-hover"><thead>'
	+ '<colgroup><col class="col-xs-1"><col class="col-xs-4"><col class="col-xs-4"></colgroup>'
        + ' <tr>'
            + '<th>#</th>'
            + '<th>Schedule Name</th>'
	    + '<th> </th>'
        + ' </tr>'
            + '</thead> <tbody>';
	for (var i = 0; i < schedules.length; i++){
		html += '<tr><td>' + (i+1) + '</td> <td><h4>'+schedules[i].SNAME+'</h4></td><td class="text-right">';
	        html += '<a href="#schedules?sid='+schedules[i].SID+'" type="button" class="btn btn-default">View</a> ';
	        html += '<a href="#deleteschedule?sid='+schedules[i].SID+'" type="button" class="btn btn-danger">Delete</a>';
		html += '</td></tr>';
	}
	html += '</tbody></table></div></div>';
	html += '<a href="#" class="btn btn-lg btn-default">&lArr; Go Back</a></div>';

    // update the main page with schedule select page html
    $( '#main' ).html(html);
  };
    
  showSchedulePage = function () {
    // kind of a hacky way of obtaining the sid of a schedule from a URL GET
    // parameter. basically this code takes a url '#schedules?sid=4' and
    // sets the variable sid equal to 4.
    var hash = window.location.hash;
    var sid = hash.substr(hash.indexOf('=')+1);

    // get all the commitments for the given schedule
    getCommitments(sid);

    // build the HTML representation of the schedule
    var html = String() 
      + '<div class="jumbotron">'
        + '<h1><a href="#">ScheduleBuddy</a></h1>'
        + '<h3>Schedule</p>'
        + '<ul>';
    for (var i = 0; i < commitments.length; i++)
      var c = commitments[i];
      html += '<li>'+c.CNAME+'. Day: '+convertDay(c.DAY)+'. Start: '+c.START_TIME+'. End: '+c.END_TIME+'</li>';
    html += '</ul></div>';

    // update the main page with commitment schedule page html
    $( '#main' ).html(html);
  };

  // ajax method to GET all the buddies of the logged-in user from backend
  getBuddies = function () {
    $.ajax({
      url: 'api/get_buddies.php?username='+username+'',
      type: 'GET',
      async: true,
      dataType: 'json',
      success: function (data) {
        for (var i = 0; i < data.length; i++)
          buddies[i] = data[i];
      }
    });
  };

  // ajax method to GET all the schedules of the logged-in user from backend
  getSchedules = function () {
    $.ajax({
      url: 'api/get_schedules.php?username='+username+'',
      type: 'GET',
      async: true,
      dataType: 'json',
      success: function (data) {
        for (var i = 0; i < data.length; i++)
          schedules[i] = data[i];
      }
    });
  }; 

  // ajax method to GET all the commitments for a given schedule, specified by
  // its sid, passed in as a function argument
  getCommitments = function (sid) {
    $.ajax({
      url: 'api/get_commitments.php?sid='+sid+'',
      type: 'GET',
      // this function is not asyncronous, as its data depends on the loading
      // of the schedule page and it cannot be done before hand
      async: false,
      dataType: 'json',
      success: function (data) {
        for (var i = 0; i < data.length; i++)
          commitments[i] = data[i];
      }
    });
  };


  // ajax method to GET all the users from the backend
    getUsers = function () {
	$.ajax({
	    url: 'api/get_users.php',
	    type: 'GET',
	    async: true,
	    dataType: 'json',
	    success: function (data) {
		for (var i = 0; i < data.length; i++) {
		    users[i] = data[i];
		}
	    }
	});
    };

  convertDay = function (day_num) {
    switch (day_num) {
      case 1: 
        return 'Monday';
      case 2:
        return 'Tuesday';
      case 3:
        return 'Wednesday';
      case 4:
        return 'Thursday';
      default:
        return 'Friday';
    }
  };
      
  onHashChange = function () {
    changePage( document.location.hash );
  };

  changePage = function (newHash) {
    if (newHash === '#buddies')
      showBuddyPage();
    else if(newHash === '#addbuddy')
      showAddBuddyPage();
    else if (newHash === '#schedules')
      showScheduleSelectPage();
    else if (newHash.substr(0,11) === '#schedules?')
      showSchedulePage();
    else
      showLandPage();
  };

  init = function (session_username) {
    // set the username associated with the session
    username = session_username;
    
    // add asynchronous events here
      getBuddies();
      getSchedules();
      getUsers();
    // bind onHashChange method to the hashchange window event and trigger it
    // to load the necessary html
    $(window)
      .bind('hashchange', onHashChange)
      .trigger('hashchange');
  };

  return { init : init };

}();
