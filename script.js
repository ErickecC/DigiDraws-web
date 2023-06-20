function scrollToSection(sectionId) {
    const section = document.querySelector(sectionId);
    section.scrollIntoView({ behavior: 'smooth' });
  }



// Configura tu proyecto de Firebase
const firebaseConfig = {
  apiKey: "TAIzaSyDa0tLUgQPNXHKHFGuTfjpGlpYsMzzzQEU",
  authDomain: "digidraws.firebaseapp.com",
  databaseURL: "https://digidraws.firebaseio.com",
  projectId: "digidraws",
  storageBucket: "igidraws.appspot.com",
  messagingSenderId: "460690469124",
  appId: "1:460690469124:web:706550a55936504e6da051"
};

// Inicializa Firebase
firebase.initializeApp(firebaseConfig);

// Referencia a la base de datos de Firebase
const dbRef = firebase.database().ref();

// Función para actualizar el nombre en la base de datos
function updateName() {
  const name = document.getElementById("name-input").value;
  dbRef.child("username").set(name);
}

// Escucha los cambios en el nombre y actualiza la página en tiempo real
dbRef.child("username").on("value", (snapshot) => {
  const name = snapshot.val();
  document.getElementById("name-input").value = name || "";
});

// Función para enviar un mensaje al chat
function sendMessage() {
  const name = document.getElementById("name-input").value;
  const message = document.getElementById("message-input").value;
  const chatContainer = document.getElementById("chat-container");
  
  if (name && message) {
    const newMessage = document.createElement("p");
    newMessage.innerText = `${name}: ${message}`;
    chatContainer.appendChild(newMessage);
    document.getElementById("message-input").value = "";

    // Guarda el mensaje en la base de datos
    dbRef.child("chat").push({
      name: name,
      message: message
    });
  }
}

// Escucha los cambios en el chat y muestra los mensajes en tiempo real
dbRef.child("chat").on("child_added", (snapshot) => {
  const message = snapshot.val();
  const chatContainer = document.getElementById("chat-container");
  const newMessage = document.createElement("p");
  newMessage.innerText = `${message.name}: ${message.message}`;
  chatContainer.appendChild(newMessage);
});
