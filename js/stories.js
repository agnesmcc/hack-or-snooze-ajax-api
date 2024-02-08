"use strict";

// This is the global list of the stories, an instance of StoryList
let storyList;

/** Get and show stories when site first loads. */

async function getAndShowStoriesOnStart() {
  storyList = await StoryList.getStories();
  $storiesLoadingMsg.remove();

  putStoriesOnPage();
}

/**
 * A render method to render HTML for an individual Story instance
 * - story: an instance of Story
 *
 * Returns the markup for the story.
 */

function generateStoryMarkup(story, myStories = false) {
  // console.debug("generateStoryMarkup", story);

  let removeBtn = ''
  if (myStories) {
   removeBtn = '<button class="remove-button">delete</button>'
  }

  let star = '<span class="not-favorited-star">&star;</span>';
  let myFavoritesIds = currentUser.favorites.map(s => s.storyId)
  if (myFavoritesIds.includes(story.storyId)) {
    star = '<span class="favorited-star">&starf;</span>'
  }

  const hostName = story.getHostName();
  return $(`
      <li id="${story.storyId}">
        ${star}
        <a href="${story.url}" target="a_blank" class="story-link">
          ${story.title}
        </a>
        <small class="story-hostname">(${hostName})</small>
        <small class="story-author">by ${story.author}</small>
        <small class="story-user">posted by ${story.username}</small>
        ${removeBtn}
        <hr>
      </li>
    `);
}

/** Gets list of stories from server, generates their HTML, and puts on page. */

function putStoriesOnPage() {
  console.debug("putStoriesOnPage");

  $allStoriesList.empty();

  // loop through all of our stories and generate HTML for them
  for (let story of storyList.stories) {
    const $story = generateStoryMarkup(story);
    $allStoriesList.append($story);
  }

  $allStoriesList.show();
}

/** Put my stories on page. */

function putMyStoriesOnPage() {
  console.debug("putMyStoriesOnPage"); 

  $allStoriesList.empty();

    // loop through our stories and generate HTML for them
    for (let story of currentUser.ownStories) {
      const $story = generateStoryMarkup(story, true);
      $allStoriesList.append($story);
    }
  
    $allStoriesList.show();

}

/** Put favorite stories on page */
function putMyFavoriteStoriesOnPage() {
  console.debug("putMyFavoriteStoriesOnPage"); 

  $allStoriesList.empty();

    // loop through our stories and append favorite stories
    for (let story of currentUser.favorites) {
      const $story = generateStoryMarkup(story);
      $allStoriesList.append($story);
    }
  
    $allStoriesList.show();

}

// function that gets data from the form and is called when user submits the form. 
// It calls for the .addStory method and puts a new story on the page.

async function userSubmit(evt) {
  evt.preventDefault();
  // Get the data from the form
  const title = $("#add-story-title").val(); 
  const author = $("#add-story-author").val();
  const url = $("#add-story-url").val();
  console.debug(title, author, url);
  let storyData = {title, author, url};
  console.debug(storyData); 
  await storyList.addStory(currentUser, storyData); 
  $addStoryForm.hide();
  putStoriesOnPage();
}

$addStoryForm.on("submit", userSubmit);

$allStoriesList.on('click', '.remove-button', async function(evt){
  let storyId = evt.target.parentElement.id;
  await storyList.removeStory(currentUser, storyId);
  putStoriesOnPage();
});

// create an event listener for favoriting the story. 
$allStoriesList.on('click', '.not-favorited-star', async function(evt){
  let storyId = evt.target.parentElement.id;
  await currentUser.addFavorite(storyId);
  putStoriesOnPage();
});

// create an event listener for unfavoriting the story. 
$allStoriesList.on('click', '.favorited-star', async function(evt){
  let storyId = evt.target.parentElement.id;
  await currentUser.removeFavorite(storyId);
  putStoriesOnPage();
});
