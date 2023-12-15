class Api {
  constructor(data) {
    this._url = data.baseUrl;
  }

  _getResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);;
  }

  getInfo(token) {
    return fetch(`${this._url}/users/me`, {
      headers: {
        "Authorization" : `Bearer ${token}`
      }
    })
    .then(this._getResponse)
    .catch(err => console.error(err))
  }

  getInitialCards(token) {
    return fetch(`${this._url}/cards`, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
    .then(this._getResponse)
  }

  setUserInfo(data, token) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        name: data.username,
        about: data.description
      })
    })
    .then(this._getResponse)
  }

  setAvatar(data, token) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        avatar: data.avatar,
      })
    })
    .then(this._getResponse)
  }

  addCard(cardData, token) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        name: cardData.name,
        link: cardData.link
      })
    })
    .then(this._getResponse)
  }

  addLike(cardId, token) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
    .then(this._getResponse)
  }

  removeLike(cardId, token) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
    .then(this._getResponse)
  }

  deleteCard(cardId, token) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
    .then(this._getResponse)
  }
}

const api = new Api({
  baseUrl: 'http://api.mesto.akzntsv.nomoredomainsmonster.ru',
});

export default api;