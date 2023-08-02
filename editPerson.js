window.location.search;
const idEdit = new URLSearchParams(window.location.search);

//EDIT
const getDataById = async (id) => {
  const response = await fetch(
    "https://datadf26-default-rtdb.firebaseio.com/" + id + ".json",
    {
      method: "GET",
    }
  );
  data = await response.json();
  return data;
};

//

const fillData = async () => {
  data = await getDataById(idEdit.get("personId"));
  console.log(data);
  document.getElementById("avatar").value = data.avatar;
  document.getElementById("firstName").value = data.firstName;
  document.getElementById("lastName").value = data.lastName;
  document.getElementById("birthdate").value = data.birthdate;
  if (data.gender === "male") {
    document.getElementById("male").checked = true;
  } else {
    document.getElementById("female").checked = true;
  }
  document.getElementById("country").value = data.country;
  document.getElementById("description").value = data.description;
};

fillData();

//
const editButton = document.getElementById("send");
editButton.addEventListener("click", (e) => {
  e.preventDefault();
  gender1 = "";
  if (document.getElementById("male").checked === true) {
    gender1 = "male";
  } else {
    gender1 = "female";
  }
  const persona = {
    avatar: document.getElementById("avatar").value,
    birthdate: document.getElementById("birthdate").value,
    country: document.getElementById("country").value,
    description: document.getElementById("description").value,
    firstName: document.getElementById("firstName").value,
    gender: gender1,
    lastName: document.getElementById("lastName").value,
  };

  updateData(persona);
  window.open(`createPerson.html`, "_self");
});

const updateData = async (persona) => {
  console.log(idEdit.get("personId"));
  const response = await fetch(
    "https://datadf26-default-rtdb.firebaseio.com/" +
      idEdit.get("personId") +
      ".json",
    {
      method: "PUT",
      headers: {
        "Content-type": "application/json;charset=UTF-8",
      },
      body: JSON.stringify(persona),
    }
  );
};
