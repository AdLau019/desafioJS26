//Seleccionar el botón
const button = document.querySelector("#send");

console.log(button);

//Agregar evento al botón
button.addEventListener("click", async (event) => {
  event.preventDefault();

  //Capturar datos del formulario

  const avatar = document.querySelector("#avatar");
  const firstName = document.querySelector("#firstName");
  const lastName = document.querySelector("#lastName");
  const birthdate = document.querySelector("#birthdate");
  const gender = document.querySelector('input[name="gender"]:checked');
  const country = document.querySelector("#country");
  const description = document.querySelector("#description");

  //Crear objeto de la data del formulario
  const persona = {
    avatar: avatar.value,
    firstName: firstName.value,
    lastName: lastName.value,
    birthdate: birthdate.value,
    gender: gender.value,
    country: country.value,
    description: description.value,
  };
  console.log(persona);

  //Crear base de datos en Firebase
  await createData(persona);

  //LLamar a la función readData
  await readData();
});

//Peticiones
//CREATE
const createData = async (persons) => {
  const dataBase = await fetch(
    "https://datadf26-default-rtdb.firebaseio.com/.json",
    {
      method: "POST",
      body: JSON.stringify(persons),
    }
  );
};

//READ
const readData = async () => {
  const read = await fetch(
    "https://datadf26-default-rtdb.firebaseio.com/.json",
    {
      method: "GET",
    }
  );
  const data = await read.json();
  console.log(data);

  if (data) {
    const array = Object.entries(data);
    console.log(data);
    let cardsArray = Object.keys(data).reduce((accum, current) => {
      let cardObject = data[current];
      return [...accum, { ...cardObject, key: current }];
    }, []);
    console.log(cardsArray);
    printAllCards(cardsArray);
  }
};
readData();

/*
<div class="card">
    <img class="card-img" src=" https://randomuser.me/api/portraits/men/21.jpg" alt="">
    <div class="card-body">
        <div class="card-content">
            <h3>Nombre:</h3>
            <h3>Apellido:</h3>
            <p>Fecha de Nacimiento:</p>
            <p>Género:</p>
            <p>País:</p>
            <p>Descripción:</p>
        </div>
        <div class="button">
            <button>Editar</button>
            <button>Eliminar</button>
        </div>
    </div>
</div>
        */
//Función card

const createPersonCard = (personData) => {
  let {
    avatar,
    birthdate,
    country,
    description,
    firstName,
    gender,
    key,
    lastName,
  } = personData;
  let card = document.createElement("div");
  card.className = "card";
  card.id = "card_" + key;

  let imgProfile = document.createElement("img");
  imgProfile.className = "card-img";
  imgProfile.src = avatar;

  let cardBody = document.createElement("div");
  cardBody.className = "card-body";

  let cardContent = document.createElement("div");
  cardContent.className = "card-content";

  let nombre = document.createElement("h3");
  nombre.className = "nombre";
  nombre.innerText = firstName;

  let apellido = document.createElement("h3");
  apellido.className = "apellido";
  apellido.innerText = lastName;

  let fechaNacimiento = document.createElement("p");
  fechaNacimiento.className = "fecha-nacimiento";
  fechaNacimiento.innerText = birthdate;

  let genero = document.createElement("p");
  genero.className = "genero";
  genero.innerText = gender;

  let pais = document.createElement("p");
  pais.className = "pais";
  pais.innerText = country;

  let descripcion = document.createElement("p");
  description.className = "descripcion";
  descripcion.innerText = description;

  let buttonWrapper = document.createElement("div");
  buttonWrapper.className = "button";

  let editButton = document.createElement("button");
  editButton.className = "button";
  editButton.innerText = "Editar";

  editButton.addEventListener("click", () => {
    window.open(`editPerson.html?personId=${key}`, "_self");
  });

  let deleteButton = document.createElement("button");
  deleteButton.className = "button";
  deleteButton.innerText = "Eliminar";
  deleteButton.addEventListener("click", () => {
    deleteData(key);
  });

  //Acomodar elementos
  buttonWrapper.append(editButton, deleteButton);
  cardContent.append(
    nombre,
    apellido,
    fechaNacimiento,
    genero,
    pais,
    descripcion
  );
  cardBody.append(cardContent, buttonWrapper);
  card.append(imgProfile, cardBody);

  console.log(card);
  return card;
};

const printAllCards = (cardData) => {
  console.log(cardData);
  let cardWrapper = document.getElementById("card-wrapper");
  cardWrapper.innerHTML = "";
  cardData.forEach((card) => {
    console.log(card);
    cardWrapper.appendChild(createPersonCard(card));
  });
};

//DELETE

const deleteData = async (key) => {
  const response = await fetch(
    "https://datadf26-default-rtdb.firebaseio.com/" + key + ".json",
    {
      method: "DELETE",
    }
  );
  document
    .getElementById("card-wrapper")
    .removeChild(document.getElementById("card_" + key));
};
