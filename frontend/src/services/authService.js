import axios from "axios";

export function signIn(credentials) {
  return new Promise((resolve, reject) => {
    axios
      .post("http://localhost:9090/users/login", credentials)
      .then((response) => {
        if (response.status === 200) {
          resolve(response.data);
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export function signUp(credentials) {
  return new Promise((resolve, reject) => {
    axios
      .post("http://localhost:9090/users/signup", credentials)
      .then((response) => {
        if (response.status === 200) {
          resolve(response.data);
        }
        reject(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export function resetPassword(credentials) {
  return new Promise((resolve, reject) => {
    axios
      .post("/api/auth/reset-password", credentials)
      .then((response) => {
        if (response.status === 200) {
          resolve(response.data);
        }
        reject(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}
