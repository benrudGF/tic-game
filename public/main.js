document.getElementById("register-btn").addEventListener("click", async () => {
	const username = document.getElementById("reg-username").value;
	const password = document.getElementById("reg-password").value;

	const response = await fetch("/register", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ username, password }),
	});

	if (response.ok) {
		alert("Registration successful!");
		document.getElementById("auth-section").style.display = "none";
		document.getElementById("game-section").style.display = "block";
	} else {
		alert("Error registering user.");
	}
});
