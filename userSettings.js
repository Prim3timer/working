const settingsMain = document.getElementsByClassName("user-setting");
[0];

const userId = localStorage.getItem("userSettingsId");
const deleter = document.getElementsByClassName("user-setting-delete")[0];
deleter.addEventListener("click", async (e) => {
  e.preventDefault();
  console.log("hiiii");
  const response = await fetch(
    `http://localhost:5000/workout-users/delete/${userId}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
  const result = await response.json();
  console.log(result);
});
const getAUser = async () => {
  const response = await fetch("http://localhost:5000/workout-users", {
    method: "GET",
    headers: {
      "Contet-Type": "application/json",
    },
  });
  const users = await response.json();
  const foundUser = users.find((user) => user._id === userId);
  console.log(foundUser.username);
  const usernameElement =
    document.getElementsByClassName("user-setting-name")[0];
  console.log(usernameElement);
  usernameElement.value = foundUser.username;
  const emailElement = document.getElementsByClassName("user-setting-email")[0];
  emailElement.value = foundUser.email;
  const verifiedElement = document.getElementsByClassName(
    "user-setting-verified",
  )[0];
  verifiedElement.value = foundUser.verified;
};

getAUser();
