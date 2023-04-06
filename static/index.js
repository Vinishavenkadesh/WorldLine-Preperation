const form = document.getElementById("form");
const firstname = document.getElementById("firstname");
const lastname = document.getElementById("lastname");
const email = document.getElementById("email");
const phoneNumber = document.getElementById("phoneNumber");
const dob = document.getElementById("dob");
const address1 = document.getElementById("addressLine1");
const address2 = document.getElementById("addressLine2");
const gender = document.getElementById("gender");
const nationality = document.getElementById("nationality");
const district = document.getElementById("district");
const state = document.getElementById("state");
const country = document.getElementById("country");
const zipcode = document.getElementById("zipcode");




form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (validityform()) {
    postData();
    getData();
  }
});

function validityform() {
// const firstnameval = firstname.value.trim();
// const lastnameval = lastname.value.trim();
// const dobval = dob.value.trim();
// const address1val = address1.value.trim();
// const address2val = address2.value.trim();
// const genderval = gender.value.trim();
// const nationalityval = nationality.value.trim();
// const stateval = state.value.trim();
// // const countryval = country.value.trim();
// const zipcodeval = zipcode.value.trim();
  const emailval = email.value.trim();
  const phoneNumberval = phoneNumber.value.trim();
  let success = true;

//   if(firstnameval === ""){
//     setError(firstname, "*FirstName is required");
//     success = false;
//   }
//   if(lastnameval === ""){
//     setError(firstname, "LastName is required");
//     success = false;
//   }
//   if(address1val === ""){
//     setError(address1, "Address is required");
//     success = false;
//   }
//   if(nationalityval === ""){
//     setError(nationality, "Nationality is required");
//     success = false;
//   }
//   if(countryval === ""){
//     setError(country, "Country is required");
//     success = false;
//   }
//   if(districtval === ""){
//     setError(district, "District is required");
//     success = false;
//   }
//   if(stateval === ""){
//     setError(state, "State is required");
//     success = false;
//   }
//   if(zipcodeval === ""){
//     setError(zipcode, "ZipCode is required");
//     success = false;
//   }
//   else if (zipcodeval.length != 6) {
//     setError(zipcode, "*ZipCode should contain 6 digits");
//     success = false;
//   }

  if (emailval === "") {
    setError(email, "*EmailId is required");
    success = false;
  } else if (!emailval.includes("@") || !emailval.includes(".com")) {
    setError(email, "*include @ and .com");
    success = false;
  } else {
    setSuccess(email);
  }

  if (phoneNumberval.length != 10) {
    setError(phoneNumber, "*PhoneNumber should contain 10 digits");
    success = false;
  } else if (
    phoneNumberval[0] != 9 &&
    phoneNumberval[0] != 6 &&
    phoneNumberval[0] != 8 &&
    phoneNumberval[0] != 7
  ) {
    setError(phoneNumber, "*Check your phone Number");
    success = false;
  } else {
    setSuccess(phoneNumber);
  }

  return success;
}

function setError(element, message) {
  const inputGroup = element.parentElement;
  const errorElement = inputGroup.querySelector(".error");
  errorElement.innerText = message;
  inputGroup.classList.add("error");
  inputGroup.classList.remove("success");
}
function setSuccess(element) {
  const inputGroup = element.parentElement;
  const errorElement = inputGroup.querySelector(".error");
  errorElement.innerText = "";
  inputGroup.classList.add("success");
  inputGroup.classList.remove("error");
}

async function postData() {
  const data = {
    firstname : firstname.value,
    lastname : lastname.value,
    email: email.value,
    phoneNumber: phoneNumber.value,
    dob : dob.value,
    address1 : address1.value,
    address2 : address2.value,
    gender : gender.value,
    nationality : nationality.value,
    district : district.value,
    state : state.value,
    country : country.value,
    zipcode : zipcode.value
  };

  await axios
    .post("http://localhost:3000/postData", data)
    .then((res) => console.log(res.data));
}
async function getData() {
  const container = document.querySelector("#container");
  const out = await axios
    .get("http://localhost:3000/getData")
    .then((res) => res.data);
  console.log(out);

  out.forEach((val) => {
    console.log(val);
    container.innerHTML = `<div style="display : flex">
  <h3>${val.phoneNumber}</h3>
  <h3>${val.email}</h3>
  </div>`;
  });
}
