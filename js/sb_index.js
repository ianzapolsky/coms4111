/**
 * sb_index.js
 * js for schedule buddy index
 * by Ian Zapolsky - 4/6/14
 */

var sb_index = function () {

  var
    // username of the logged-in user for use in api calls
    username,

  // methods
  init, getBuddies, getSchedules, 
  onHashChange, changePage,
  // these are all the pages we would like to implement
  showLandPage, showBuddyPage, showSchedulePage;

  onHashChange = function () {
    changePage( document.location.hash );
  };

  changePage = function (newHash) {
    showHomePage();
  };

  init = function (username) {
    
    // add asynchronous events here
    //
    //
    // bind onHashChange method to the hashchange window event and trigger it
    // to load the necessary html
    $(window)
      .bind('hashchange', onHashChange)
      .trigger('hashchange');
  };

  return { init : init };

}();
