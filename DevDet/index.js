const searchbar = document.querySelector(".searchBar-Container");
const profilecontainer = document.querySelector(".profile-container");
const root = document.documentElement.style;
const get = (take) => document.getElementById(`${take}`);
const url = "https://api.github.com/users/";
const noresults = get("no-results");
const btnmode = get("btn-mode");
const modetext = get("mode-text");
const modeicon = get("mode-icon");
const btnsubmit = get("submit");
const input = get("input");
const avatar = get("avatar");
const username = get("name");
const user = get("user");
const date = get("date");
const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
const bio = get("bio");
const repos = get("repos");
const followers = get("followers");
const following = get("following");
const user_location = get("location");
const page = get("page");
const twitter = get("twitter");
const company = get("company");
let darkMode = false;

// Event Listeners
btnsubmit.addEventListener("click", function () {
  if (input.value !== "") {
    getUserData(url + input.value);
  }
});

input.addEventListener("keydown", function (e) {
  if (e.key == "Enter") {
    if (input.value !== "") {
      getUserData(url + input.value);
    }
  }
});

input.addEventListener("input", function () {
  noresults.style.display = "none";
});

btnmode.addEventListener("click", function () {
  if (darkMode == false) {
    darkModeProperties();
  } else {
    lightModeProperties();
  }
});

// API CALL
function getUserData(gitUrl) {
  fetch(gitUrl)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      updateProfile(data);
    })
    .catch((error) => {
      console.error(error);
    });
}

// Render the data's------------------------------------------
function updateProfile(data) {
  if (data.message !== "Not Found") {
    noresults.style.display = "none";

    function checkNull(check1, check2) {
      if (check1 === "" || check1 === null) {
        check2.style.opacity = 0.5;
        check2.previousElementSibling.style.opacity = 0.5;
        return false;
      } else {
        return true;
      }
    }

    avatar.src = data.avatar_url;
    username.innerText = data.name === null ? data.login : data.name;
    user.innerText = `@${data.login}`;
    user.href = data.html_url;
    const dataSegments = data.created_at.split("T")[0].split("-");
    date.innerText = `Joined ${dataSegments[2]} ${months[parseInt(dataSegments[1]) - 1]} ${dataSegments[0]}`;
    bio.innerText = data.bio == null ? "This profile has no bio" : data.bio;
    repos.innerText = data.public_repos;
    followers.innerText = data.followers;
    following.innerText = data.following;
    user_location.innerText = checkNull(data.location, user_location) ? data.location : "Not Available";
    page.innerText = checkNull(data.blog, page) ? data.blog : "Not Available";
    page.href = checkNull(data.blog, page) ? data.blog : "#";
    twitter.innerText = checkNull(data.twitter_username, twitter) ? data.twitter_username : "Not Available";
    twitter.href = checkNull(data.twitter_username, twitter) ? `https://twitter.com/${data.twitter_username}` : "#";
    company.innerText = checkNull(data.company, company) ? data.company : "Not Available";
    searchbar.classList.toggle("active");
    profilecontainer.classList.toggle("active");
  } else {
    noresults.style.display = "block";
  }
}

// switch to DarkModeProperties
function darkModeProperties() {
  root.setProperty("--lm-bg", "#141D2F");
  root.setProperty("--lm-bg-content", "#1E2A47");
  root.setProperty("--lm-text", "white");
  root.setProperty("--lm-text-alt", "white");
  root.setProperty("--lm-shadow-xl", "rgba(70,88,109,0.15)");
  modetext.innerText = "LIGHT";
  modeicon.src = "./assets/images/sun-icon.svg";
  root.setProperty("--lm-icon-bg", "brightness(1000%)");
  darkMode = true;
  // console.log("darkmode changed to " + darkMode);
  localStorage.setItem("dark-mode", true);
  // console.log("setting dark mode to true");
}

// switch to LightModeProperties
function lightModeProperties() {
  root.setProperty("--lm-bg", "#F6F8FF");
  root.setProperty("--lm-bg-content", "#FEFEFE");
  root.setProperty("--lm-text", "#4B6A9B");
  root.setProperty("--lm-text-alt", "#2B3442");
  root.setProperty("--lm-shadow-xl", "rgba(70, 88, 109, 0.25)");
  modetext.innerText = "DARK";
  modeicon.src = "./assets/images/moon-icon.svg";
  root.setProperty("--lm-icon-bg", "brightness(100%)");
  darkMode = false;
  
  localStorage.setItem("dark-mode", false);
}

// Initial UI
function inIt() {
  darkMode = false;

  // const preferDarkMode = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches

  const value = localStorage.getItem("dark-mode");

  if (value === null) {
    localStorage.setItem("dark-mode", darkMode);
    lightModeProperties();
  } else if (value == "true") {
    darkModeProperties();
  } else if (value == "false") {
    lightModeProperties();
  }

  getUserData(url + "bikashcool");
}

inIt();
