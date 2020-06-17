function sendEmail(){
  const name = document.querySelector('#validationCustom01');
  const email = document.querySelector('#validationCustom02');
  const body = document.querySelector('#validationCustom03');
  const answer = document.querySelector('#answer');
  
  if (!name.value || !email.value || !body.value) {
    answer.innerHTML = `<h6  class="mb-4 text-center">No data was sent!</h6>`
    console.log('not sent!');
    return false;
  }

  Email.send({
    SecureToken: "2c0a952d-c47c-4bf6-a9dc-272f25851ae8",
    To : 'hey@fernandocueto.com',
    From : "hey@fernandocueto.com",
    Subject : `Contact from ${name.value}`,
    Body : `<strong>${name.value}</strong> ha escrito:<br>${body.value}<br><br>Para responder escribir al correo: ${email.value}`
  }).then(
    name.value = '',
    email.value = '',
    body.value = '',
    answer.innerHTML = `<h6  class="mb-4 text-center">Thanks. I'll be in touch soon!</h6>`
  );  
}

