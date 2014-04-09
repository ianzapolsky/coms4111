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
    // list of groups for the currently viewed user
    groups = [],
    // list of users
    users = [],

  // methods
    init, convertDay, onHashChange, changePage,
  // ajax
    getBuddies, getSchedules, getCommitments, getGroups, postBuddy,
  // these are all the pages we would like to implement
    showLandPage, showBuddyPage, showAddBuddyPage, showScheduleSelectPage, 
    showSchedulePage, showGroupPage;

    showLandPage = function () {
	var html = String()
        + '<div class="jumbotron">'
          + '<h1>Welcome, '+username+'!</h1>'
          + '<ul class="list-unstyled" style="margin-left: 20px;">'
            +'<li><h2><a href="#buddies">Buddies</a></h2></li>'
	    +'<li><h2><a href="#schedules?username='+username+'">Schedules</a></h2></li>'
	    +'<li><h2><a href="#groups?username=' + username + '"">Groups</a></h2></li>'
          + '</ul>'
        + '</div>'
    // update the main page with land page html
	$( '#main' ).html(html);
    };

    showBuddyPage = function () {
	getBuddies();
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
	for (var i = 0; i < buddies.length; i++) {
	    html += '<tr><td>'+(i+1)+'</td> <td>'+buddies[i].USERNAME+'</td><td>';
	    html += '<div class="btn-group"><button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown">Options <span class="caret"></span></button>';
	    html += '<ul class="dropdown-menu" role="menu">';
	    html += '<li><a href="#schedules?username='+buddies[i].USERNAME+'">View Schedules</a></li>';
	    html += '<li><a href="#">Send Invite</a></li>';
	    html += '<li class="divider"></li>';
	    html += '<li><a href="#buddies" id="'+buddies[i].USERNAME+'" class="delete-buddy">Delete Buddy</a></li>';
	    html += '</ul></div></td></tr>';
	}
	html += '</tbody></table></div></div>';
	html += '<a href="#" class="btn btn-lg btn-default">&lArr; Go Back</a></div>';

    // update the main page with buddy page html
	$( '#main' ).html(html);
  
	$( '.delete-buddy' ).click(function () {
	    var username2 = $(this).attr("id");
	    $.ajax({
		url: 'api/delete_buddy.php?username1='+username+'&username2='+username2+'',
		type: 'GET',
		async: false,
	    });
	    document.location.reload();
	});
    };

    showAddBuddyPage = function () {
	getUsers();
	var html = String() 
        + '<div class="jumbotron">'
          + '<h3>Add Buddies</h3><br>'
	        + '<p class="text-right">'
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
	for (var i = 0; i < users.length; i++){
	    html += '<tr><td>' + (i+1) + '</td> <td>' + users[i].USERNAME+'</td><td>';
	    html += '<a id="'+users[i].USERNAME+'" type="button" class="add-buddy btn btn-default">Add Buddy</a>';
	}
	html += '</tbody></table></div></div>';
	html += '<a href="#buddies" class="btn btn-lg btn-default">&lArr; Go Back</a></div>';
    
    // update the main page with buddy page html
	$( '#main' ).html(html);

	$( '.add-buddy' ).click(function () {
	    var username1 = username;
	    var username2 = $(this).attr("id");
	    postBuddy(username1,username2);
	    document.location.hash = '#buddies';
	}); 
    };

    showScheduleSelectPage = function () {
	var hash = window.location.hash;
	var uname = hash.substr(hash.indexOf('=')+1);
	getSchedules(uname);
	var html = String() 
      + '<div class="jumbotron">'
      + '<h3>Your Schedules</h3><br>'
      + '<p class="text-right"><a href="#createschedule" type="button" class="btn btn-default">Add Schedule</a></p>'
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
	    html += '<tr><td>' + (i+1) + '</td> <td>'+schedules[i].SNAME+'</td><td class="text-right">';
	    html += '<a href="#schedules?sid='+schedules[i].SID+'" type="button" class="btn btn-default">View</a> ';
	    html += '<a href="#deleteschedule?sid='+schedules[i].SID+'" type="button" class="btn btn-danger">Delete</a>';
	    html += '</td></tr>';
	}
	html += '</tbody></table></div></div>';
	html += '<a href="#" class="btn btn-lg btn-default">&lArr; Go Back</a></div>';

    // update the main page with schedule select page html
	$( '#main' ).html(html);
    };

    showCreateSchedulePage = function () {
	var html = String() 
	    + '<div class="jumbotron">'
	    + '<h3>Create a Schedule</h3><br>'
	    + '<form role="form">'
	    + '<div class="form-group">'
	    + '<label for="exampleInputEmail1">Schedule Name</label>'
	    + '<input type="email" class="form-control" id="exampleInputEmail1" placeholder="Enter Schedule Name">'
	    + '</div>'
	    + '<p class="text-right"><button type="submit" class="btn btn-default">Submit</button></p>'
	    + '</form>'
	    + '<a href="#schedules" class="btn btn-lg btn-default">&lArr; Go Back</a></div>';

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

    showGroupPage = function () {
	var hash = window.location.hash;
	var uname = hash.substr(hash.indexOf('=')+1);
	getGroups(uname);

	var html = String() 
      + '<div class="jumbotron">'
      + '<h3>Your Groups</h3><br>'
      + '<p class="text-right"><a href="#joingroup" type="button" class="btn btn-default">Join Group</a></p>'
      + '<div class="panel panel-default">'
        + '<div class="panel-body">'
	        + '<table class="table table-hover"><thead>'
	          + '<colgroup><col class="col-xs-1"><col class="col-xs-7"><col class="col-xs-1"></colgroup>'
            + ' <tr>'
              + '<th>#</th>'
              + '<th>Group Name</th>'
	            + '<th> </th>'
            + ' </tr>'
            + '</thead> <tbody>';
	for (var i = 0; i < groups.length; i++) {
	    html += '<tr><td>'+(i+1)+'</td> <td>'+groups[i].GNAME+'</td><td>';
	    html += '<div class="btn-group"><button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown">Options <span class="caret"></span></button>';
	    html += '<ul class="dropdown-menu" role="menu">';
	    html += '<li><a href="#schedules?username='+groups[i].GNAME+'">View Members</a></li>';
	    html += '<li><a href="#schedules?username='+groups[i].GNAME+'">Invite Buddy to Group</a></li>';
	    html += '<li class="divider"></li>';
	    html += '<li><a href="#groups" id="'+groups[i].GNAME+'" class="delete-group">Leave Group</a></li>';
	    html += '</ul></div></td></tr>';
	}
	html += '</tbody></table></div></div>';
	html += '<a href="#" class="btn btn-lg btn-default">&lArr; Go Back</a></div>';

    // update the main page with buddy page html
	$( '#main' ).html(html);
  
	$( '.delete-group' ).click(function () {
	    var gname = $(this).attr("id");
	    $.ajax({
		url: 'api/delete_group.php?username='+username+'&group='+gname+'',
		type: 'GET',
		async: false,
	    });
	    document.location.reload();
	});
    };

  // ajax method to GET all the buddies of the logged-in user from backend
    getBuddies = function () {
	$.ajax({
	    url: 'api/get_buddies.php?username='+username+'',
	    type: 'GET',
	    async: false,
	    dataType: 'json',
	    success: function (data) {
		for (var i = 0; i < data.length; i++)
		    buddies[i] = data[i];
	    }
	});
    };

  // ajax method to GET all the schedules of the logged-in user from backend
    getSchedules = function (uname) {
	$.ajax({
	    url: 'api/get_schedules.php?username='+uname+'',
	    type: 'GET',
	    async: false,
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

  // ajax method to GET all the schedules of the logged-in user from backend
    getGroups = function (uname) {
	$.ajax({
	    url: 'api/get_groups.php?username='+uname+'',
	    type: 'GET',
	    async: false,
	    dataType: 'json',
	    success: function (data) {
		for (var i = 0; i < data.length; i++)
		    groups[i] = data[i];
	    }
	});
    }; 

  // ajax method to GET all the users from the backend
    getUsers = function (async_control) {
	$.ajax({
	    url: 'api/get_users.php',
	    type: 'GET',
	    async: false,
	    dataType: 'json',
	    success: function (data) {
		for (var i = 0; i < data.length; i++) {
		    users[i] = data[i];
		}
	    }
	});
    };

    postBuddy = function (username1, username2) {
	var buddy = {'USERNAME1': username1, 'USERNAME2': username2};
	$.ajax({
	    url: 'api/post_buddy.php',
	    type: 'POST',
	    async: false,
	    data: buddy,
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
	else if (newHash.substr(0,20) === '#schedules?username=')
	    showScheduleSelectPage();
	else if (newHash === '#createschedule')
	    showCreateSchedulePage();
	else if (newHash.substr(0,15) === '#schedules?sid=')
	    showSchedulePage();
	else if (newHash.substr(0,17) === '#groups?username=')
	    showGroups();
    else
	showLandPage();
    };

    init = function (session_username) {
    // set the username associated with the session
	username = session_username;
    
    // add asynchronous events here
	getUsers();
    // bind onHashChange method to the hashchange window event and trigger it
    // to load the necessary html
	$(window)
	    .bind('hashchange', onHashChange)
	    .trigger('hashchange');
    };

    return { init : init };

}();