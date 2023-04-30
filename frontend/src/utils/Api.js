import { apiConfig } from '../utils/constants';

class Api {
  constructor(setting) {
    this._address = setting.baseUrl;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status} `);
  }

  // универсальный метод запроса с проверкой ответа,
  // чтобы не дублировать эту проверку в каждом запросе
  _request(url, options) {
    return fetch(url, options).then(this._checkResponse)
  }


  // загрузка информации о пользователе с сервера
  getUserInfo() {
    const token = localStorage.getItem('token');
    return this._request(`${this._address}/users/me`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    })
  }

  // запрос к серверу за карточками
  getCards() {
    const token = localStorage.getItem('token');
    return this._request(`${this._address}/cards`, {
      headers: {
        authorization: `Bearer ${token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    })

  }

  // запрос на редактирование профиля
  editUser(name, about) {
    const token = localStorage.getItem('token');
    return this._request(`${this._address}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: `Bearer ${token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        about
      })
    })
  }

  // добавление новой карточки
  addCard(name, link) {
    const token = localStorage.getItem('token');
    return this._request(`${this._address}/cards`, {
      method: 'POST',
      headers: {
        authorization: `Bearer ${token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        link
      })
    })
  }

  // запрос на удаление карточки
  deleteCard(id) {
    const token = localStorage.getItem('token');
    return this._request(`${this._address}/cards/${id}`, {
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    })
  }

  // обновление аватара пользователя
  editAvatar(link) {
    const token = localStorage.getItem('token');
    return this._request(`${this._address}/users/me/avatar `, {
      method: 'PATCH',
      headers: {
        authorization: `Bearer ${token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: link,
      })
    })
  }

  // постановка лайка
  addLike(id) {
    const token = localStorage.getItem('token');
    return this._request(`${this._address}/cards/${id}/likes`, {
      method: 'PUT',
      headers: {
        authorization: `Bearer ${token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    })
  }

  // снятие лайка
  removeLike(id) {
    const token = localStorage.getItem('token');
    return this._request(`${this._address}/cards/${id}/likes`, {
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    })
  }
}

const userApi = new Api(apiConfig);

export default userApi;












