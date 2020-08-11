const setErrorAlert = (input) => {
  const parentControl = input.parentElement;

  parentControl.classList.remove("success");
  parentControl.classList.add("error");
};

const setSuccessFor = (input) => {
  const parentControl = input.parentElement;

  parentControl.classList.remove("error");
  parentControl.classList.add("success");
};

const checkInputs = (name, email, body) => {
  let result = true;

  if (name.value.trim() === "") {
    setErrorAlert(name);
    result = false;
  } else {
    setSuccessFor(name);
  }
  if (email.value.trim() === "") {
    setErrorAlert(email);
    result = false;
  } else {
    setSuccessFor(email);
  }
  if (message.value.trim() === "") {
    setErrorAlert(message);
    result = false;
  } else {
    setSuccessFor(message);
  }

  return result;
};

const sendEmail = () => {
  const name = document.getElementById("fullname");
  const email = document.getElementById("email");
  const body = document.getElementById("message");
  const answer = document.getElementById("answer");

  if (!checkInputs(name, email, body)) return;
  // if (!name.value || !email.value || !body.value) {
  //   answer.innerHTML = `<h6  class="mb-4 text-center">No data was sent!</h6>`;
  //   console.log("not sent!");
  //   return false;
  // }

  Email.send({
    SecureToken: "2c0a952d-c47c-4bf6-a9dc-272f25851ae8",
    To: "hey@fernandocueto.com",
    From: "hey@fernandocueto.com",
    Subject: `Contact from ${name.value}`,
    Body: `<strong>${name.value}</strong> ha escrito:<br>${body.value}<br><br>Para responder escribir al correo: ${email.value}`,
  }).then(
    (name.value = ""),
    (email.value = ""),
    (body.value = ""),
    (answer.innerHTML = `<h6 class="mb-4 text-center">Thanks. I'll be in touch soon!</h6>`)
  );
};
