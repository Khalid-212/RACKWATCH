export const getApis = async () => {
  try {
    const res = await fetch("http://localhost:3232/apis", {
      method: "GET",
      body: JSON.stringify({
        email: email,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => console.log(response.json()));
  } catch (error) {
    console.error("Error:", error.message);
    // Handle the error or display an error message
  }
};
