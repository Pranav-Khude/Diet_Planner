const login_btn = document.querySelector("#login_submit");

login_btn.addEventListener("click", performLogin);
async function performLogin() {
  const email = document.querySelector(".email").value;
  const password = document.querySelector(".email-password").value;

  const raw = JSON.stringify({
    name: email,
    password: password,
  });

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: raw,
    redirect: "follow",
  };

  try {
    const response = await fetch("http://localhost/signin", requestOptions);

    if (response.ok) {
      const token = await response.json(); // Adjust this based on actual response format
      setCookie("login", token, 1);
      alert("Login successful!");
    } else {
      const errorText = await response.text();
      alert(`Login failed: ${errorText}`);
    }
  } catch (error) {
    console.error("Error during login:", error);
    alert("An error occurred during login.");
  }
}

// Function to set a cookie
function setCookie(name, value, days) {
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
}
