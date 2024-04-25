const handleSubmit = async (e) => {
  e.preventDefault();

  const data = {
    userName: document.getElementById("userName").value,
    passWord: document.getElementById("passWord").value,
  };

  const body = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  console.log(body);

  const response = await fetch("/login", body);
  if (response.status === 200) {
    localStorage.setItem("logdin", "true");
    window.location.replace("/index");
  } else {
    localStorage.setItem("logdin", "");
    const errElement = document.getElementById("err");
    errElement.innerHTML = "failed to login";
  }
  console.log("response", response);
};

const logout = () => {
  localStorage.setItem("logdin", "");
};

// const observeUrlChange = () => {
//   let oldHref = document.location.href;
//   const body = document.querySelector("body");
//   const observer = new MutationObserver((mutations) => {
//     console.log(oldHref, document.location.href);
//     if (oldHref !== document.location.href) {
//       oldHref = document.location.href;
//
//     }
//   });
//   observer.observe(body, { childList: true, subtree: true });
// };

// window.onload = observeUrlChange;

window.onload = () => {
  if (
    localStorage.getItem("logdin") !== "true" &&
    document.location.href === "http://localhost:3000/index"
  ) {
    window.location.replace("/login");
  }
};
