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
    // list of groups for the logged-in user
    groups = [],
    // list of users all users
    users = [],
    // list of members in a currently viewed group
    members = [],
    // list of invites for the logged in user
    invites = [],

  // methods
  init, convertDay, onHashChange, changePage,
  // ajax
  getBuddies, getSchedules, getCommitments, getGroups, getUsers, postBuddy,
  deleteBuddy, joinGroup, leaveGroup, postSchedule, getMaxSID,
  // these are all the pages we would like to implement
  showLandPage, showBuddyPage, showAddBuddyPage, showScheduleSelectPage, 
  showSchedulePage, showGroupPage, showJoinGroupPage, showCreateCommitmentPage, 
  showInvitesPage, createInvitePage, showCreateSchedulePage, showMembersPage;

  showLandPage = function () {

	  document.getElementById('calendar').style.display="none";

	  var html = String()
        + '<div class="jumbotron">'
          + '<h2>Welcome, '+username+'!</h2>'
          + '<ul class="list-unstyled" style="margin-left: 20px;">'
            +'<li><h3><a href="#buddies">Buddies</a></h3></li>'
	          +'<li><h3><a href="#schedules?username='+username+'">Schedules</a></h3></li>'
	          +'<li><h3><a href="#groups">Groups</a></h3></li>'
+'<li><h3><a href="#invites">Invites</a></h3></li>'
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
      deleteBuddy(username, username2);
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

  showScheduleSelectPage = function (uname) {
      schedules = [];
	  getSchedules(uname);
	  var html = String() 
      + '<div class="jumbotron">'
      + '<h3>' + uname + '\'s Schedules</h3><br>'
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
	    + '<form id="create-schedule" role="form">'
	    + '<div class="form-group">'
	    + '<label for="">Schedule Name</label>'
	    + '<input type="text" class="form-control" id="sname" placeholder="Enter Schedule Name">'
	    + '</div>'
	    + '<p class="text-right"><button href="#schedules" type="submit" class="btn btn-default">Submit</button></p>'
	    + '</form>'
	    + '<a href="#schedules" class="btn btn-lg btn-default">&lArr; Go Back</a></div>';

	  // update the main page with schedule select page html
	  $( '#main' ).html(html);
  
    $( '#create-schedule' ).submit(function (event) {
      var sname = $( '#sname' ).val();
      postSchedule(sname);
      document.location.hash = '#schedules?username='+username;
    });

  };

  showCreateCommitmentPage = function () {
    var html = String() 
      + '<div class="jumbotron">'
      + '<h3>Create a Commitment</h3><br>'
      + '<form id="commitment-create" class="form-horizontal" role="form">'
      + '<div class="form-group">'
      + '<label for="cname" class="col-sm-2 control-label">Commitment Name</label>'
      + '<div class="col-sm-10">'
      + '<input type="text" class="form-control" id="cname" placeholder="Commitment Name"></div></div>'
      + '<div class="form-group">'
      + '<label for="cname" class="col-sm-2 control-label">Day</label>'
      + '<div class="col-sm-10">'
      + '<input type="text" class="form-control" id="day" placeholder="Day (1=Monday, 2=Tuesday, 3=Wednesday, 4=Thursday, 5=Friday)">'
      + '</div></div>'
      + '<div class="form-group">'
      + '<label for="start-time" class="col-sm-2 control-label">Start Time</label>'
      + '<div class="col-sm-10">'
      + '<input type="text" class="form-control" id="start-time" placeholder="Start Time (ex. 11:30AM = 1130, 3:30PM = 1530)">'
      + '</div></div>'
      + '<div class="form-group">'
      + '<label for="end-time" class="col-sm-2 control-label">End Time</label>'
            + '<div class="col-sm-10">'
      + '<input type="text" class="form-control" id="end-time" placeholder="End Time (ex. 11:30AM = 1130, 3:30PM = 1530)">'
            + '</div></div>';
      html += '<div class="form-group"><div class="col-sm-offset-2 col-sm-10">'
      html += '<button id="commitment-submit" type="submit" class="btn btn-default">Create Commitment</button>'
      html += '</div></div></form>';

    // update the main page with schedule select page html
    $( '#main' ).html(html);

    $( '#commitment-submit' ).click(function () {
      console.log('clicked');
	    var 
        cid,
        hash = window.location.hash,
	      sid = hash.substr(hash.indexOf('=')+1),
        cname = $('#cname').val(),
        start_time = $('#start-time').val(),
        end_time = $('#end-time').val(),
        day = $('#day').val();

      $.ajax({
        url: 'api/get_max_CID.php',
        type: 'GET',
        async: false,
        success: function (data) {
          var json = JSON.parse(data);
          cid = parseInt(json['MAX(CID)'][0])+1;
        }
      });

      $.ajax({
        url: 'api/post_commitment.php?CID='+cid+'&SID='+sid+'&CNAME='+cname+'&START_TIME='+start_time+'&END_TIME='+end_time+'&DAY='+day+'',
        type: 'GET',
        async: false,
      });
      window.location.hash = '#schedules?sid='+sid+'';
    });
  };

  showSchedulePage = function () {
      refreshCalendar();
	// makes the schedule appear
	document.getElementById('calendar').style.display="block";

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
            + '<h3>View Schedule</h3><br><h4>Commitments:</h4>'

	    + '<p class="text-right"><a href="#createcommitment?sid='+sid+'" type="button" class="btn btn-default">Add Commitment</a></p>'
	    + '<div class="panel panel-default">'
            + '<div class="panel-body">'
	    + '<table class="table table-hover"><thead>'
            + ' <tr>'
	    + '<th>#</th>'
            + '<th>Commitment Name</th>'
            + '<th>Day</th>'
	    + '<th>Start Time</th>'
	    + '<th>End Time</th>'
	    + '<th> </th>'
            + ' </tr>'
            + '</thead> <tbody>';

	for (var i = 0; i < commitments.length; i++){
	    var c = commitments[i];
	    html += '<tr><td>' + (i+1) + '</td> <td>'+c.CNAME+'</td>';
	    html += '<td>' + convertDay(c.DAY) + '</td><td>' + c.START_TIME + '</td><td>' + c.END_TIME + '</td>';
	    html += '<td class="text-right">';
	    html += '</td></tr>';
	    var element = "d" + c.DAY + "t";

      var starttime = c.START_TIME;
      var stimelength = starttime.length;
      var startcell = (starttime.substring(0,stimelength-2) - 7.5)*2;
      if(starttime.substring(stimelength-2, stimelength)/60 >= 0.5)
    startcell+=1;

      var endtime = c.END_TIME;
      var etimelength = endtime.length;
      var endcell = (endtime.substring(0, etimelength-2) - 7.5)*2;
      if(endtime.substring(etimelength-2, etimelength)/60 >= 0.5)
    endcell+=1;

	    /*
	    var startcell = (c.START_TIME.substring(0, 2) - 7.5)*2;
	    if(c.START_TIME.substring(2, 4)/60 >= 0.5)
		startcell+=1;

	    var endcell = (c.END_TIME.substring(0, 2) - 7.5)*2;
	    if(c.END_TIME.substring(2, 4)/60 >= 0.5)
		endcell+=1;
      */

	    for(var start = startcell; start < endcell + 1; start++)
		document.getElementById(element + start).style.background="#e58282";

	}
	html += '</tbody></table></div></div>';
	html += '<br><a href="#schedules?username='+username + '" class="btn btn-lg btn-default">&lArr; Go Back</a></div>';

    // update the main page with commitment schedule page html
	$( '#main' ).html(html);

    };

  showGroupPage = function () {
	  getGroups(false);
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
	    html += '<li><a href="#members?gid='+groups[i].GID+'">View Members</a></li>';
	    html += '<li class="divider"></li>';
	    html += '<li><a href="#groups" id="'+groups[i].GID+'" class="leave-group">Leave Group</a></li>';
	    html += '</ul></div></td></tr>';
	  }
	  html += '</tbody></table></div></div>';
	  html += '<a href="#" class="btn btn-lg btn-default">&lArr; Go Back</a></div>';

    // update the main page with buddy page html
	  $( '#main' ).html(html);

    $( '.leave-group' ).click(function() {
      var gid = $(this).attr('id');
      leaveGroup(gid);
      document.location.reload();
    });
  };

  showJoinGroupPage = function () {
    getGroups(true);
    var html = String()
      + '<div class="jumbotron">'
        + '<h3>Join Groups</h3><br>'
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
    for (var i = 0; i < groups.length; i++){
      html += '<tr><td>' + (i+1) + '</td> <td>' + groups[i].GNAME+'</td><td>';
      html += '<a id="'+groups[i].GID+'" type="button" class="join-group btn btn-default">Join Group</a>';
    }
    html += '</tbody></table></div></div>';
    html += '<a href="#groups" class="btn btn-lg btn-default">&lArr; Go Back</a></div>';
    // update the main page with buddy page html
    $( '#main' ).html(html);

    $( '.join-group' ).click(function () {
      var gid = $(this).attr("id");
      joinGroup(gid);
      document.location.hash = '#groups';
    });
  };

  showMembersPage = function () {
	  // makes the schedule appear
	  document.getElementById('calendar').style.display="block";

	  // kind of a hacky way of obtaining the sid of a schedule from a URL GET
	  // parameter. basically this code takes a url '#schedules?sid=4' and
	  // sets the variable sid equal to 4.
	  var hash = window.location.hash;
	  var gid = hash.substr(hash.indexOf('=')+1);

	  // get all the commitments for the given schedule
	  getMembers(gid);

	  // build the HTML representation of the schedule
	  var html = String() 
	    + '<div class="jumbotron">'
            + '<h3>View Members</h3><br>'

	    + '<p class="text-right"><a href="#createcommitment" type="button" class="btn btn-default">Add Commitment</a></p>'
	    + '<div class="panel panel-default">'
            + '<div class="panel-body">'
	    + '<table class="table table-hover"><thead>'
            + ' <tr>'
	    + '<th>#</th>'
            + '<th>Member Name</th>'
            + ' </tr>'
            + '</thead> <tbody>';

      refreshCalendar();
	    // goes through each member of the group
	    for (var i = 0; i < members.length; i++){
	        var m = members[i];
	        html += '<tr><td>' + (i+1) + '</td> <td>'+m.USERNAME+'</td>';
		
		getSchedules(m.USERNAME);
		// adds each member's commitments in schedules to the calendar
		for(var s = 0; s < schedules.length; s++){
		    getCommitments(schedules[s].SID);
		    		    
		    for(var c = 0; c < commitments.length; c++){
			var com = commitments[c];
      
			var starttime = com.START_TIME;
			var stimelength = starttime.length;
			var startcell = (starttime.substring(0,stimelength-2) - 7.5)*2;
			if(starttime.substring(stimelength-2, stimelength)/60 >= 0.5)
			    startcell+=1;

			var endtime = com.END_TIME;
			var etimelength = endtime.length;
			var endcell = (endtime.substring(0, etimelength-2) - 7.5)*2;
			if(endtime.substring(etimelength-2, etimelength)/60 >= 0.5)
			    endcell+=1;					


			var element = "d" + com.DAY + "t";
			for(var start = startcell; start < endcell + 1; start++){
			    document.getElementById(element + start).style.background="#e58282";
			}
		 }

		}

	}
	    
	html += '</tbody></table></div></div>';
	html += '<br><a href="#groups" class="btn btn-lg btn-default">&lArr; Go Back</a></div>';

	// update the main page with commitment schedule page html
	$( '#main' ).html(html);

  };

    showInvitesPage = function () {
	invites = [];
	getInvites();
	var html = String() 
      + '<div class="jumbotron">'
      + '<h3>Your Invites</h3><br>'
	+ '<p class="text-right"><a href="#createcommitment" type="button" class="btn btn-default">Create Commitment</a>    '
+ '<a href="#createinvite" type="button" class="btn btn-default">Create Invite</a></p>'

      + '<div class="panel panel-default">'
        + '<div class="panel-body">'
	        + '<table class="table table-hover"><thead>'
	          + '<colgroup><col class="col-xs-1"><col class="col-xs-7"><col class="col-xs-1"></colgroup>'
            + ' <tr>'
              + '<th>#</th>'
              + '<th>Invite Name</th>'
	      + '<th>Day</td>'
	            + '<th>Start Time</th>'
	     + '<th>End Time</th>'
            + ' </tr>'
            + '</thead> <tbody>';

	for (var i = 0; i < invites.length; i++) {
	    getCommitment(invites[i].CID);
	    html += '<tr><td>'+(i+1)+'</td> <td>'+invites[i].INAME+'</td><td>' + commitments[0].DAY + '</td>';
	    html += '<td>' + commitments[0].START_TIME + '</td><td>' + commitments[0].END_TIME + '</td></tr>';
	}

	html += '</tbody></table></div></div>';
	html += '<a href="#" class="btn btn-lg btn-default">&lArr; Go Back</a></div>';

    // update the main page with buddy page html
	$( '#main' ).html(html);
  
	$( '.delete-invite' ).click(function () {
	    var username2 = $(this).attr("id");
	    deleteInvite(username, username2);
	    document.location.reload();
	});
    };

  showCreateInvitePage = function () {
	  var html = String() 
      + '<div class="jumbotron">'
      + '<h3>Create an Invite</h3><br>'
      + '<form id="invite-create" class="form-horizontal">'
      + '<div class="form-group">'
      + '<label for="iname" class="col-sm-2 control-label">Invite Name</label>'
      + '<div class="col-sm-10">'
      + '<input type="text" class="form-control" id="iname" placeholder="Invite Name">'
      + '</div></div>'
      + '<div class="form-group">'
      + '<label for="username" class="col-sm-2 control-label">Recipient</label>'
      + '<div class="col-sm-10">'
      + '<input type="text" class="form-control" id="username" placeholder="Receiver\'s Username">'
      + '</div></div>'
      + '<div class="form-group">'
      + '<label for="start-time" class="col-sm-2 control-label">Commitment</label>'
	    + '<div class="col-sm-10">';

	getSchedules(username);
	// goes through each schedule
	for (var i = 0; i < schedules.length; i++){
	    var s = schedules[i];
	    getCommitments(s.SID);
	    // adds each member's commitments in schedules to the calendar
		for(var c = 0; c < commitments.length; c++){
		    var com = commitments[c];
		    html += '<div class="radio"><label>';
		    html += '<input type="radio" name="radioOptions" id="'+com.CID+'" value="'+com.CID+'">';
		    html += com.CNAME + ", " + convertDay(com.CDAY) + " from " + com.START_TIME + " to " + com.END_TIME;
		    html += '</label></div>';
		}
	}

  html += '<div class="form-group"><div class="col-sm-offset-2 col-sm-10"><br>';
  html += '<button id="invite-submit" type="submit" class="btn btn-default">Create Invite</button>';
	html += '</div></div>';
  html += '</form>';
	html += '</tbody></table></div></div>';
	html += '<br><a href="#schedules?username='+username + '" class="btn btn-lg btn-default">&lArr; Go Back</a></div>';


    // update the main page with schedule select page html
	$( '#main' ).html(html);

	$( '#invite-create' ).submit(function (event) {
      event.preventDefault();
      var
        iid,
        cid = $('input[type=radio]:checked', '.radio').val(),
        iname = $('#iname').val(),
        recipient_name = $('#username').val();

	    $.ajax({
		    url: 'api/get_max_IID.php',
		    type: 'GET',
		    async: false,
		    success: function (data) {
		      var json = JSON.parse(data);
		      iid = parseInt(json['MAX(IID)'][0])+1;
		    }
	    });

      console.log(iid);
      console.log(cid);
      console.log(iname);
      console.log(recipient_name);

	    $.ajax({
		    url: 'api/post_invite.php?IID='+iid+'&CID='+cid+'&INAME='+iname+'&USERNAME='+recipient_name+'',
		    type: 'GET',
		    async: false,
	    });
	    document.location.reload();
	  });
  };

  // ajax method to GET all the buddies of the logged-in user from backend
  getBuddies = function () {
      buddies = [];
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
      schedules = [];
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
      commitments = [];
	  $.ajax({
	    url: 'api/get_commitments.php?sid='+sid+'',
	    type: 'GET',
	    async: false,
	    dataType: 'json',
	    success: function (data) {
		    for (var i = 0; i < data.length; i++)
		    commitments[i] = data[i];
	    }
	  });
  };

  // ajax method to GET all the commitments for a given schedule, specified by
  // its sid, passed in as a function argument
    getCommitment = function (cid) {
	commitments = [];
	$.ajax({
	    url: 'api/get_commitment.php?cid='+cid+'',
	    type: 'GET',
	    async: false,
	    dataType: 'json',
	    success: function (data) {
		for (var i = 0; i < data.length; i++)
		    commitments[i] = data[i];
	    }
	});
    };

    refreshCalendar = function(){
	for(var x = 1; x<6; x++){
	    for(var y = 1; y < 25; y++){
		document.getElementById("d" + x + "t" + y).style.background="none";
	    }
	}

    }
  // ajax method to GET all the schedules of the logged-in user from backend
  getGroups = function (all) {
    // reinitialize groups to an empty array
    groups = [];
    if (all === true) {
	    $.ajax({
	      url: 'api/get_groups.php',
	      type: 'GET',
	      async: false,
	      dataType: 'json',
	      success: function (data) {
		      for (var i = 0; i < data.length; i++) {
		        groups[i] = data[i];
	        }
        }
	    });
    } else {
	    $.ajax({
	      url: 'api/get_groups.php?username='+username+'',
	      type: 'GET',
	      async: false,
	      dataType: 'json',
	      success: function (data) {
		      for (var i = 0; i < data.length; i++) {
		        groups[i] = data[i];
	        }
        }
	    });
    }
  }; 

  joinGroup = function (gid) {
    $.ajax({
      url: 'api/join_group.php?username='+username+'&gid='+gid+'',
      type: 'GET',
      async: false,
    });
  };

  leaveGroup = function (gid) {
    $.ajax({
      url: 'api/leave_group.php?username='+username+'&gid='+gid+'',
      type: 'GET',
      async: false,
    });
  };

  // ajax method to GET all the members of a group from backend
    getMembers = function (gid) {
    // reinitialize members to an empty array
	members = [];

	    $.ajax({
		url: 'api/get_members.php?gid='+gid+'',
		type: 'GET',
		async: false,
		dataType: 'json',
		success: function (data) {
		    for (var i = 0; i < data.length; i++) {
			members[i] = data[i];
		    }
		}
	    });

    }; 

  postSchedule = function (sname) {
    var sid;
    $.ajax({
      url: 'api/get_max_SID.php',
      type: 'GET',
      async: false,
      success: function (data) {
        var json = JSON.parse(data);
        sid = parseInt(json['MAX(SID)'][0])+1;

      }
    });
    console.log(sid);
    console.log(username);
    console.log(sname);
    $.ajax({
      url: 'api/post_schedule.php?SID='+String(sid)+'&USERNAME='+username+'&SNAME='+sname+'',
      type: 'GET',
      async: false,
      success: function () {
        console.log('success');
      }
    });
  };

  // ajax method to GET all the invites of the logged-in user from backend
    getInvites = function () {
	invites = [];
	$.ajax({
	    url: 'api/get_invites.php?username='+username+'',
	    type: 'GET',
	    async: false,
	    dataType: 'json',
	    success: function (data) {
		for (var i = 0; i < data.length; i++)
		    invites[i] = data[i];
	    }
	});
    };

  // ajax method to GET all the users from the backend
  getUsers = function () {
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

  // ajax method to post a new buddy relationship to the backend
  postBuddy = function (username1, username2) {
	  var buddy = {'USERNAME1': username1, 'USERNAME2': username2};
	  $.ajax({
	    url: 'api/post_buddy.php',
	    type: 'POST',
	    async: false,
	    data: buddy,
	  });
  };

  // ajax method to delete a group from the backend
  deleteBuddy = function (username1, username2) {
	  $.ajax({
		  url: 'api/delete_buddy.php?username1='+username1+'&username2='+username2+'',
		  type: 'GET',
		  async: false,
	  });
  };
    
  convertDay = function (day_num) {
	switch (day_num) {
	case '1': 
            return 'Monday';
	case '2':
            return 'Tuesday';
	case '3':
            return 'Wednesday';
	case '4':
            return 'Thursday';
	default:
            return 'Friday';
  }
  };
      
  onHashChange = function () {
	  changePage( document.location.hash );
  };

  changePage = function (newHash) {
      refreshCalendar();
	  document.getElementById('calendar').style.display="none";
	  if (newHash === '#buddies')
	    showBuddyPage();
	  else if(newHash === '#addbuddy')
	    showAddBuddyPage();
	  else if (newHash.substr(0,20) === '#schedules?username=') {
	      var uname = newHash.substr(newHash.indexOf('=')+1);
	      showScheduleSelectPage(uname);
	  }
	  else if (newHash === '#createschedule')
	    showCreateSchedulePage();
          else if (newHash.substr(0,17) === '#createcommitment')
            showCreateCommitmentPage();
	  else if (newHash.substr(0,15) === '#schedules?sid=')
	    showSchedulePage();
          else if(newHash.substr(0, 13) === '#members?gid=')
	    showMembersPage();
          else if (newHash === '#createcommitment')
	    showCreateCommitmentPage();
	  else if (newHash === '#groups')
	    showGroupPage();
          else if (newHash === '#joingroup')
	    showJoinGroupPage();
          else if (newHash === '#invites')
	    showInvitesPage();
      else if (newHash === '#createinvite')
	  showCreateInvitePage();
	  else
	    showLandPage();
  };

  init = function (session_username) {
      refreshCalendar();
      document.getElementById('calendar').style.display="none";
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
