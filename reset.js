import { myUrl } from "./myUrl.js";

const resetUrl = window.location.search;
console.log(resetUrl);
const urlParams = new URLSearchParams(resetUrl);
const email = urlParams.get("email");
const issuedTime = urlParams.get("elapsed");
console.log(email);

const passwordElement = document.getElementsByClassName("password")[0];
// const password = passwordElement.value;
console.log(password);
const consfirmpasswordElement =
  document.getElementsByClassName("confirm-password")[0];
console.log(passwordElement, consfirmpasswordElement);

const submitElement = document.getElementsByClassName("submit-button")[0];

// if ()

const getUserVerified = async (e) => {
  e.preventDefault();
  const passObj = { password: passwordElement.value };
  console.log(passObj);
  const response = await fetch(`${myUrl}/workout-users`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const users = await response.json();
  const foundUser = users.find((user) => user.email === email);
  console.log(users);
  const updateUser = await fetch(
    `${myUrl}/workout-users/reset-password/${foundUser._id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(passObj),
    },
  );
};

submitElement.addEventListener("click", getUserVerified);
