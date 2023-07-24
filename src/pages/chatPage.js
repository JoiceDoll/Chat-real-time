const socket = io("http://localhost:3030");
const inputMessageValue = document.querySelector(".chat-input");
const sendMessageButton = document.querySelector(".chat-button");
const bodyMessages = document.querySelector(".chat-general-content");
const usernameValue = document.querySelector(".input-username");
const submitUsernameValue = document.querySelector(".username-button");
const initialBackground = document.querySelector(".initial-background");
const welcomeUsername = document.querySelector(".welcome-message");
const userValue = [];

function getUsername() {
  let username = usernameValue.value;

  if (username) {
    initialBackground.style.display = "none";
    userValue.push(username);
    welcomeUsername.innerHTML = `Olá ${username} &#128075;`;
  } else {
    username = "Anonymous";
    initialBackground.style.display = "none";
    userValue.push(username);
    welcomeUsername.innerHTML = `Olá ${username} &#128075;`;
  }
}

submitUsernameValue.addEventListener("click", (e) => {
  e.preventDefault();
  getUsername();
});

usernameValue.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    getUsername();
  }
});

function renderMessages(message) {
  const newMessage = document.createElement("p");
  newMessage.classList.add("p-message-class");
  newMessage.textContent = `${message.author}: ${message.message}`;
  bodyMessages.append(newMessage);
}
socket.on("previousMessages", function (messages) {
  for (message of messages) {
    renderMessages(message);
  }
});

function sendSocket() {
  const userNameToString = userValue[0];
  const message = inputMessageValue.value;

  if (message && userNameToString) {
    const messageObject = {
      author: userNameToString,
      message: message,
    };

    socket.emit("message", messageObject);
    inputMessageValue.value = "";
    renderMessages(messageObject);
  }
}
sendMessageButton.addEventListener("click", (e) => {
  e.preventDefault();
  sendSocket();
});

inputMessageValue.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    sendSocket();
  }
});

socket.on("receivedMessage", function (message) {
  renderMessages(message);
});
