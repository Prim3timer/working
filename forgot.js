import { myUrl } from "./myUrl.js";
const email = document.getElementsByClassName("email-input")[0];
const submitButton = document.getElementsByClassName("forgot-submit-button")[0];
console.log(email);
const replyElement = document.getElementsByClassName("reply")[0];

const publicKey = "WomkoMTNuMoQKJO0K";
const serviceId = "service_w6jsnfc";
const templateId = "template_zexwf7h";

const verifyEmail = async (e) => {
  e.preventDefault();
  const trimmedEmail = email.value.trim().toLowerCase();
  const now = Date.now();
  try {
    const response = await fetch(`${myUrl}/workout-users`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const users = await response.json();
    const user = users.find((user) => user.email === email.value);
    console.log(user);
    if (user) {
      let templateParams = {
        email: trimmedEmail,
        link: `http://${window.location.host}/reset-password.html?email=${user.email}&elapse=${now}`,
      };

      const mailSent = await emailjs.send(
        serviceId,
        templateId,
        templateParams,
        publicKey,
      );
      replyElement.innerHTML = `we have sent an email to your "${user.email}". head over there to reset your passwor`;
    } else {
      replyElement.innerHTML = `the email entered does not match any in our database`;
    }
  } catch (error) {
    console.log(error);
  }
};

submitButton.addEventListener("click", verifyEmail);
