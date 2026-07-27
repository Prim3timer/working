const inputs = document.getElementsByClassName("reg-input");
const regButton = document.getElementsByClassName("sign-up-anchor")[0];
const linker = document.getElementsByClassName("linker")[0];
console.log(linker);
console.log(regButton);
console.log(inputs);

const now = Date.now();
const serviceId = "service_d1lfnf9";
const biz = "aerobics lab";
const templateId = "template_2ho80e4";
const publicKey = "f5fHgbJA_Fp-FHsdN";
const rightNow = new Date();

const handleSubmit = async () => {
  console.log("asongo yeye!");
  const email = inputs[1].value;
  const username = inputs[0].value;
  const password = inputs[2].value;
  const confirmPassword = inputs[3].value;
  const trimmedUsername = username.trim();
  const trimmedPassword = password.trim();
  const trimmedEmail = email.trim().toLowerCase();
  const credential = {
    username: trimmedUsername,
    email: trimmedEmail,
    password: trimmedPassword,
    name: username,
    joined: rightNow,
    workSettings: {},
  };
  console.log(credential);
  try {
    const templateParams = {
      name: username,
      email: trimmedEmail,
      biz,
      link: `http://${window.location.host}/index.html?email=${trimmedEmail.toLowerCase()}&elapsed=${now}`,
    };

    const mailSent = await emailjs.send(
      serviceId,
      templateId,
      templateParams,
      publicKey,
    );

    if (password === confirmPassword) {
      linker.innerHTML = `A link has been sent to ${trimmedEmail}. Head over there to verify your email`;
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
    console.log(error.message);
  }
};
regButton.addEventListener("click", handleSubmit);
