export const createUser = async () => {
  try {
    const res = await fetch("http://localhost:3232/user", {
      method: "POST",
      body: JSON.stringify({
        email: "neww@email.com",
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Check if the response status is OK (200)
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }

    // Check if the response content type is JSON
    const contentType = res.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      throw new Error("Invalid content type. Expected JSON.");
    }

    // Parse the JSON response
    const data = await res.json();
    console.log(data);
    if (data == "user exists") {
      localStorage.setItem("user", email);
    }
  } catch (error) {
    console.error("Error:", error.message);
    // Handle the error or display an error message
  }
};
