document.addEventListener("click", (e) => {
  const { target } = e;
  if (!target.matches("nav a")) {
    return;
  }
  e.preventDefault();
  urlRoute();
});

const urlRoutes = {
    404: {
            template: "template/404.html",

    },
    checkint

  "/": "index.html",
  "/settings": "/settings.html",
  "/performance": "/performance.html",
  "/users": "/users.html",
  "/indeces": "/indeces.html",
};

const urlRoute = (event) => {
  event = event || window.event;
  event.preventDefault();
  window.history.pushState({}, "", event.target.href);
  urlLocationHandler();
};

const urlLocationHandler = async () => {
  const location = window.location.pathname;
  if (location.length === 0) {
    location = "/";
  }
  const route = urlRoutes[location] || urlRoutes[404];
  const html = await fetch(route).then((response) => response.text());
  document.getElementById("content").innerHTML = html;
};

window.onpopstate = urlLocationHandler;
window.route = urlRoute;
urlLocationHandler();
