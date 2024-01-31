class Api {
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers;
  }

  #onResponse(res) {
    return res.ok
      ? res.json()
      : res.json().then((errData) => Promise.reject(errData));
  }

  getCardData() {
    return fetch(`${this._url}/cards`, {
      headers: this._headers,
    }).then(this.#onResponse);
  }

  changeCardLikeStatus(cardId, isLiked) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: isLiked ? "DELETE" : "PUT",
      headers: this._headers,
    }).then(this.#onResponse);
  }

  deleteCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this.#onResponse);
  }

  addCard(cardTitle, cardLink) {
    return fetch(`${this._url}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: cardTitle, 
        link: cardLink
      }),
    }).then(this.#onResponse);
  }

  getUserData() {
    return fetch(`${this._url}/users/me`, {
      headers: this._headers,
    }).then(this.#onResponse);
  }

  setUserInfo(userName, userAbout) {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: userName,
        about: userAbout
      }),
    }).then(this.#onResponse);
  }

  setUserAvatar(link) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: link.avatar
      }),
    }).then(this.#onResponse);
  }
}

const apiConfig = {
  url: 'https://api.domainigor.students.nomoredomainsmonster.ru',
  credentials: 'include',
  headers: {
      'Content-Type': 'application/json'
  }
}

const api = new Api(apiConfig);

export default api;
