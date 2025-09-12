export const login = async (username: string, password: string) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (username && password) {
        const user = { username };
        localStorage.setItem("token", "mock-token");
        localStorage.setItem("currentUser", JSON.stringify(user));
        resolve(user);
      } else {
        reject("Invalid credentials");
      }
    }, 500);
  });
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("currentUser");
};
