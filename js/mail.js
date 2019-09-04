function sendEmail(){
  const send = document.querySelector('#send');
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
    Host : "smtpout.europe.secureserver.net",
    Username : "hey@fernandocueto.com",
    Password : "72007766",
    To : 'hey@fernandocueto.com',
    From : "hey@fernandocueto.com",
    Subject : `Contact from ${name.value}`,
    Body : `${email.value}: ${body.value}`
  }).then(
    name.value = '',
    email.value = '',
    body.value = '',
    answer.innerHTML = `<h6  class="mb-4 text-center">Thanks. I'll be in touch soon!</h6>`
  );  
}

