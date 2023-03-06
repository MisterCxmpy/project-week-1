const timerValue = document.querySelector("#timer-value")

const startCountdown = (e) => {
    var value = parseInt(timerValue.textContent)
    setInterval(() => {
        if (value > 0) {
            value--;
            timerValue.textContent = value
        }
    }, 1000);
}

startCountdown()