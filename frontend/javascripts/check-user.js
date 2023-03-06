if (performance.navigation.type == performance.navigation.TYPE_RELOAD) {
  localStorage.setItem("username", "");
}

if (localStorage.getItem("username") == "") {
  window.location.href = "index.html";
}
