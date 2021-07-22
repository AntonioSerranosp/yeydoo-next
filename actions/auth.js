export const startLogin = (email, password) => {
  return async () => {
    const values = { email, password };
    const response = await fetch("http://localhost:3000/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
  };
};
