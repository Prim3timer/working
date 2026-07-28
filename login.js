import { myUrl } from "./myUrl.js";
const loginLink = document.getElementsByClassName("sign-up-anchor")[0];
const username = document.getElementById("username");
const password = document.getElementById("password");
const mainElement = document.getElementsByClassName("login")[0];
const formElement = document.getElementsByClassName("login-form")[0];

const myUrl = window.location.search;
console.log(myUrl);
const urlParams = new URLSearchParams(myUrl);
const email = urlParams.get("email");
const issuedTime = urlParams.get("elapsed");
console.log(email, issuedTime);
const getVerified = async () => {
  if (email) {
    const response = await fetch(`${myUrl}/workout-users`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const users = await response.json();
    const foundUser = users.find((user) => user.email === email);
    if (foundUser) {
      const updateUser = await fetch(
        `${myUrl}/workout-users/verification/${foundUser._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      const reply = await updateUser.json();
      const replyElement = document.createElement("p");
      replyElement.style.backgroundColor = "gainsboro";
      replyElement.style.padding = ".5rem";
      replyElement.style.borderRadius = "5px";
      replyElement.innerHTML = reply;
      console.log(reply);
      mainElement.insertBefore(replyElement, formElement);
    }
  }
};

getVerified();
const handleLogin = async (e) => {
  e.preventDefault();
  console.log(password.value);
  const credential = {
    username: username.value,
    password: password.value,
  };

  const response = await fetch("http://localhost:5000/workout-auth", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credential),
  });
  const user = await response.json();
  console.log(user);
  console.log(username.value);
  console.log(username.value === user.name);
  if (username.value === user.name) {
    console.log(window.location.href);
    localStorage.setItem("workoutUserId", user.id);
    window.location.href = "indeces.html";
  } else {
    console.log("denied");
    console.log(loginLink.href);
    window.location.href = "index.html";
    console.log("not logged in");
  }
};

loginLink.addEventListener("click", handleLogin);
