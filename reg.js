const inputs = document.getElementsByClassName("reg-input");
const regButton = document.getElementsByClassName("sign-up-anchor")[0];
const linker = document.getElementsByClassName("linker")[0];
console.log(linker);
console.log(regButton);
console.log(inputs);

const sendEmail = async () => {
  const templateParams = {
    name: "John Doe",
    message: "Hello from Vanilla JS!",
  };

  // 'emailjs' is globally available from the CDN
  emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", templateParams).then(
    (response) => {
      console.log("SUCCESS!", response.status, response.text);
    },
    (error) => {
      console.error("FAILED...", error);
    },
  );
};

const handleSubmit = async () => {
  const email = inputs[1].value;
  linker.innerHTML = `A link has been sent to ${email}. Head over there to verify your email`;
  const username = inputs[0].value;
  const password = inputs[2].value;
  const confirmPassword = inputs[3].value;
  const credential = {
    username,
    email,
    password,
  };
  try {
    if (password === confirmPassword) {
      const response = await fetch("http://localhost:5000/workout-register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credential),
      });
      console.log(await response);
    } else {
      console.log("password do not match");
    }
  } catch (error) {
    console.log(errorr.message);
  }
};
regButton.addEventListener("click", handleSubmit);
