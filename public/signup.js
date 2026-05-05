document.getElementById("register-btn").addEventListener("click", async () => {
    const username = document.getElementById("reg-username").value;
    const password = document.getElementById("reg-password").value;

    const response = await fetch("/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
        const data = await response.json();
        alert(`Registration successful! Welcome, ${data.username}`);
        window.location.href = "index.html";
    } else {
        alert("Error registering user.");
    }
});