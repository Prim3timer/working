import { myUrl } from "./myUrl.js";
const settingsMain = document.getElementsByClassName("user-setting")[0];
const selectElement = document.getElementsByClassName("roles-select")[0];
const saver = document.getElementsByClassName("user-setting-saver")[0];
const userId = localStorage.getItem("userSettingsId");
const mainUserId = localStorage.getItem("workouUserId");
const usernameElement = document.getElementsByClassName("user-setting-name")[0];
const userAnchor = document.getElementsByClassName("users-anchor")[0];
const activeElement = document.getElementsByClassName(
  "user-setting-verified",
)[0];

const ROLES = {
  User: 2001,
  Manager: 1984,
  Admin: 5150,
};

let userRoles = [];

const rolesArray = Object.keys(ROLES);
const optons = rolesArray.map((role) => {
  const roleOption = document.createElement("option");
  roleOption.className = "role-option";
  roleOption.innerHTML = role;
  return roleOption;
});
selectElement.append(optons[0], optons[1], optons[2]);
console.log(optons);
console.log(selectElement);
selectElement.addEventListener("change", (e) => {
  const allValues = Array.from(e.target.selectedOptions).map(
    (option) => option.value,
  );
  if (!allValues.includes("User")) {
    return;
  }
  if (allValues.length > 1 && !allValues.includes("Manager")) {
    return;
  } else {
  }
  userRoles = allValues;
  console.log(userRoles);
  // selectElement.value = userRoles;
});

activeElement.addEventListener("change", () => !activeElement.checked);

const updateUser = async () => {
  const newRoles = {
    User: 2001,
  };
  let newest = {};
  try {
    const userChange = userRoles.map((role) => {
      if (role === "Manager") newest = { ...newRoles, Manager: 1984 };
      else if (role === "Admin")
        newest = { ...newRoles, Manager: 1984, Admin: 5150 };
      else newest = newRoles;

      return newest;
    });

    const currentRole = userChange.pop();
    const updatedPerson = {
      username: usernameElement.value,
      roles: currentRole,
      active: activeElement.checked,
    };
    const response = await fetch(
      `${myUrl}/workout-users/user-setting/${userId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedPerson),
      },
    );
    const reply = await response.json();
    console.log(reply);
  } catch (error) {
    console.log(error);
  }
};

saver.addEventListener("click", updateUser);

let verifyWindow = document.createElement("div");
verifyWindow.className = "no-verify-window";
verifyWindow.style.padding = ".5rem";
verifyWindow.style.display = "flex";
verifyWindow.style.flexDirection = "column";
verifyWindow.style.rowGap = "1rem";
verifyWindow.style.alignItems = "center";
verifyWindow.style.backgroundColor = "lavender";
verifyWindow.style.position = "fixed";
verifyWindow.style.top = "40%";

let question = document.createElement("p");
question.innerHTML = "Are you sure you want to delete this user?";

let verifyWindowButtonCont = document.createElement("article");
// verifyWindow.append(verifyWindowButtonCont);
let itemId = "";
// verifyWindowButtonCont.className = "verify-button-cont";
let noButton = document.createElement("button");
noButton.innerHTML = "No";
let yesButton = document.createElement("button");
yesButton.innerHTML = "Yes";
verifyWindowButtonCont.append(noButton, yesButton);
verifyWindow.append(question, verifyWindowButtonCont);

settingsMain.appendChild(verifyWindow);
const removeVerifier = () => {
  verifyWindow.className = "verify-window";
  verifyWindowButtonCont.className = "verify-button-cont";
};

noButton.addEventListener("click", () => {
  verifyWindow.className = "no-verify-window";
});

const deleter = document.getElementsByClassName("user-setting-delete")[0];
deleter.addEventListener("click", removeVerifier);
yesButton.addEventListener("click", async (e) => {
  e.preventDefault();
  window.location.href = "/users.html";
  try {
    const response = await fetch(`${myUrl}/workout-users/delete/${userId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    verifyWindow.className = "no-verify-window";
    const result = await response.json();
    console.log(result);
  } catch (error) {
    console.log(error);
  }
});
const editUser = async () => {};
const getAUser = async () => {
  const response = await fetch(`${myUrl}/workout-users`, {
    method: "GET",
    headers: {
      "Contet-Type": "application/json",
    },
  });
  const users = await response.json();
  const foundUser = users.find((user) => user._id === userId);
  const user = users.find((user) => user._id === mainUserId);
  selectElement.name = "roles";
  const mainUserRoles = Object.keys(user?.roles);
  const foundUserRoles = Object.keys(foundUser.roles);
  selectElement.value = foundUserRoles;
  console.log(user);
  const usernameElement =
    document.getElementsByClassName("user-setting-name")[0];
  usernameElement.value = foundUser.username;
  if (!mainUserRoles.includes("Admin")) userAnchor.href = "";
  activeElement.checked = foundUser.active;
  // const emailElement = document.getElementsByClassName("user-setting-email")[0];
  // emailElement.value = foundUser.email;
  const verifiedElement = document.getElementsByClassName(
    "user-setting-verified",
  )[0];
  verifiedElement.value = foundUser.verified;
};

getAUser();
