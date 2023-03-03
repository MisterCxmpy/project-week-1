const startBtn = document.querySelector("#start-btn")
const nickNameInput = document.querySelector("#nick-name-input")

const getUser = (e) => {
    const username = nickNameInput.value

    if (!username) return;

    localStorage.setItem('username', username);

    nickNameInput.value = ""

    window.location.href = "home.html";
}

startBtn.addEventListener("click", getUser);
