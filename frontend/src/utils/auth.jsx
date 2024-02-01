const baseUrl = "https://api.domainigor.students.nomoredomainsmonster.ru";

function getResponse(res) {
  if (res.ok) {
    return res.json();
  } else {
    return res.json().then((errData) => Promise.reject(errData));
  }
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
    .catch(error => {
      console.error('Ошибка при получении данных:', error);
      return Promise.reject(error);
    });
};

export const authorize = (email, password) => {
  return fetch(`${baseUrl}/signin`, {
    method: 'POST',
    credentials: 'include',
    headers: {
        "Content-Type": "application/json" 
    },
    body: JSON.stringify({
      password: password,
      email: email
    }),
  })
    .then(getResponse)
    .catch(error => {
      console.error('Ошибка при получении данных:', error);
      return Promise.reject(error);
    });
};

export const checkToken = (token) => {
    return fetch(`${baseUrl}/users/me`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
    })
      .then(getResponse)
      .catch(error => {
        console.error('Ошибка при получении данных:', error);
        return Promise.reject(error);
      });
  };
