const startBtn = document.querySelector("#start-btn");
const nickNameInput = document.querySelector("#nick-name-input");
const usernameModal = document.querySelector("#username-modal");
const closeUserModalBtn = document.querySelector("#close-user-modal-btn")

const getUser = (e) => {
  const username = nickNameInput.value;
  let data = localStorage.getItem("usernames");
  let usernameData = data ? JSON.parse(data) : [];

  if (!username) return;

  const user = usernameData.find(
    (user) => user.toLowerCase() == username.toLowerCase()
  );

  if (user) {
    usernameModal.style.display = "block";
  } else {
    usernameData.push(username);
    localStorage.setItem("usernames", JSON.stringify(usernameData));

    localStorage.setItem("username", username);

    nickNameInput.value = "";

    window.location.href = "home.html";
  }
};

const closeUserModal = (e) => {
    usernameModal.style.display = "none";
}

startBtn.addEventListener("click", getUser);
closeUserModalBtn.addEventListener("click", closeUserModal)