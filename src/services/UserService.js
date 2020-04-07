import {API_URL} from '../common/constants';

export const logout = () =>
    fetch(`${API_URL}/logout`, {
      method: 'POST',
      credentials: "include"
    })

export const profile = () =>
    fetch(`${API_URL}/profile`, {
      method: 'POST',
      credentials: "include"
    }).then(response => response.json());


export const updateProfile = (userId, user) =>
    fetch(`${API_URL}/profile/${userId}`, {
      method: 'PUT',
      body: JSON.stringify(user),
      headers: {
        'content-type': 'application/json'
      },
      credentials: "include"
    }).then(response => response.json())

export const register = (user) =>
    fetch(`${API_URL}/register`, {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'content-type': 'application/json'
      },
      credentials: "include"
    }).then(response => response.json())


export const login = (user) =>
    fetch(`${API_URL}/login`, {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'content-type': 'application/json'
      },
      credentials: "include"
    }).then(response => response.json())