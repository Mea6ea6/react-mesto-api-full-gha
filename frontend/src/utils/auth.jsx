const baseUrl = "https://api.domainigor.students.nomoredomainsmonster.ru";

function getResponse(res) {
  return res.ok ? res.json() : res.json().then((errData) => Promise.reject(errData));
}

export const register = (email, password) => {
  return fetch(`${baseUrl}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      password: password,
      email: email
    }),
  })
    .then(getResponse)
    .then((res) => {
      return res;
    })
};

export const authorize = (email, password) => {
  return fetch(`${baseUrl}/signin`, {
    method: 'POST',
    headers: {
        "Content-Type": "application/json" 
    },
    body: JSON.stringify({
      password: password,
      email: email
    }),
  })
  .then(getResponse)
};

export const checkToken = (token) => {
    return fetch(`${baseUrl}/users/me`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
    }
    })
    .then(getResponse)
  };