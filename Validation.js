// this is the function to check if the user has selected the contact method
function isContactMethodSelected() {
  const choices = document.getElementsByName("choice");
  const errorMessage = document.getElementById("errorMessage");
//Iterator will go through all the choices and if one is selected, return true
  for (let i = 0; i < choices.length; i++) {
    if (choices[i].checked) {
      return true;
    }
  }
// If the user did not select the contact method, display the error message in this text:
  errorMessage.textContent =
    "Please select how you prefer to be contacted";
// False return will also prevent the submission. So if any function returns false, the submission is interrupted
  return false;
}
// This fnction will check if the date selected is one day away from the current date
function checkDate() {
// fetches the id from the html file
  const dateInput = document.getElementById("Date").value;
  const errorMessage = document.getElementById("errorMessage");
// if no date selected, then display an error message
  if (!dateInput) {
    errorMessage.textContent = "Please select a start date";
    return false;
  }

  const selectedDate = new Date(dateInput);
  const today = new Date();

  // remove time from today
  today.setHours(0, 0, 0, 0);

  // minimum allowed date is tomorrow
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
//if the selected date is not at least a day after the current date, display an error message
  if (selectedDate < tomorrow) {
    errorMessage.textContent =
      "Date must be at least one day after today";
    return false;
  }

  return true;
}
//This will compare emails the user has put in
function checkEmails() {
  const email = document.getElementById("Email").value;
    const confirmEmail = document.getElementById("Confirm_Email").value;
    const errorMessage = document.getElementById("errorMessage");
// If the Email and Confirm_Email do not match, display the error message
    if (email !== confirmEmail) {
      errorMessage.textContent = "Emails do not match";
      return false;
    }

// emails match
  return true;
}
// This is the long one, but this creates a pop up of all information the user has put in
function showSummary() {
// This aquires all values from the ids that exist inside the form
  const project = document.getElementById("Project_name").value;
  const date = document.getElementById("Date").value;
  const name = document.getElementById("Name").value;
  const description = document.getElementById("Project_description").value;
  const email = document.getElementById("Email").value;
  document.getElementById("Confirm_Email")
  const phone = document.getElementById("Phone_number").value;

  let contactMethod = "";
  const choices = document.getElementsByName("choice");
// This took me a while to figure out but this was a way to obtain the value from the selected choices
  for (let i = 0; i < choices.length; i++) {
    if (choices[i].checked) {
      contactMethod = choices[i].value;
      break;
    }
  }
// This shows the display of the entire pop up
  const summary =
    "Please confirm your details:\n\n" +
    "Name: " + name + "\n" +
    "Project: " + project + "\n" +
    "Start Date: " + date + "\n" +
    "Description: " + description + "\n\n" +
    "Email: " + email + "\n" +
    "Phone: " + phone + "\n" +
    "Preferred Contact Method: " + contactMethod + "\n" +
    "To: 250055933@aston.ac.uk";
// If the user clicks on cancel instead of confirm, allow the user to keep editing the form
  if (!confirm(summary)) {
    return false; // user clicked Cancel
  }
// Otherwise, submit the form and reset it entirely
  return true;
}
// This runs every function i have made in one function
// This allows me to only having to use one function when i set up the onsubmit value
function validateForm(){
// Sets the initial value of the error message to empty string
  const errorMessage = document.getElementById("errorMessage");
  errorMessage.textContent = "";
// If any of these fail, return the value false and interrupt validation
  if (!checkEmails()) return false;
  if (!checkDate()) return false;
  if (!isContactMethodSelected()) return false;
// This function will only be reached if  3 previous function return true. This is a sign of a successful validation
  return showSummary();

}
