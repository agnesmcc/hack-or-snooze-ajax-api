"use strict";

/******************************************************************************
 * Handling navbar clicks and updating navbar
 */

/** Show main list of all stories when click site name */

function navAllStories(evt) {
  console.debug("navAllStories", evt);
  hidePageComponents();
  putStoriesOnPage();
}

$body.on("click", "#nav-all", navAllStories);

/** Show */

function navLoginClick(evt) {
  console.debug("navLoginClick", evt);
  hidePageComponents();
  $loginForm.show();
  $signupForm.show();
}

$navLogin.on("click", navLoginClick);

/** Navbar submit click function. Add story click. */

function addStoryClick(evt) {
  console.debug("addStoryClick", evt);
  hidePageComponents();
  $addStoryForm.show();
}
// this jquery object is defined at the top of main.js
$navSubmit.on("click", addStoryClick);

/** Navbar my story click function. Shows my stories. */
function showMyStories(evt) {
  console.debug("showMyStories", evt); 
  hidePageComponents(); 
  putMyStoriesOnPage();
}
// this jquery object is defined at the top of main.js
$navMyStories.on("click", showMyStories); 

//** Show my favorite stories function. */
function showMyFavoriteStories(evt) {
  console.debug("showMyFavoriteStories", evt); 
  hidePageComponents(); 
  putMyFavoriteStoriesOnPage();
}
// this jquery object is defined at the top of main.js
$navFavorites.on("click", showMyFavoriteStories);


/** When a user first logins in, update the navbar to reflect that. */

function updateNavOnLogin() {
  console.debug("updateNavOnLogin");
  $(".main-nav-links").show();
  $navLogin.hide();
  $navLogOut.show();
  $navUserProfile.text(`${currentUser.username}`).show();
}
