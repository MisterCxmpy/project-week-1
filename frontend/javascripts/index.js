const startBtn = document.querySelector("#start-btn");
const nickNameInput = document.querySelector("#nick-name-input");

const usernameModal = document.querySelector("#username-modal");
const closeUserModalBtn = document.querySelector("#close-user-modal-btn")

const errorModal = document.querySelector("#error-modal");
const closeErrorModalBtn = document.querySelector("#close-error-modal-btn")

const clearCacheBtn = document.querySelector("#clear-cache-btn")

const getUser = (e) => {
  const username = nickNameInput.value;
  let data = localStorage.getItem("usernames");
  let usernameData = data ? JSON.parse(data) : [];

  if (!username) {
    errorModal.style.display = "block";
    return;
  };

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

const closeErrorModal = (e) => {
  errorModal.style.display = "none";
}

const clearCache = (e) => {
    localStorage.clear()
}

startBtn.addEventListener("click", getUser);
closeUserModalBtn.addEventListener("click", closeUserModal)
closeErrorModalBtn.addEventListener("click", closeErrorModal)
clearCacheBtn.addEventListener("click", clearCache)