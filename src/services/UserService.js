import {API_URL} from '../common/constants';

export const logout = () =>
    fetch(`http://localhost:8080/logout`, {
      method: 'POST',
      credentials: "include"
    }).then(response => response.json());

export const profile = () =>
    fetch(`http://localhost:8080/profile`, {
      method: 'POST',
      credentials: "include"
    }).then(response => response.json());


export const updateProfile = (user) =>
    fetch(`http://localhost:8080/profile`, {
      method: 'PUT',
      body: JSON.stringify(user),
      headers: {
        'content-type': 'application/json'
      },
      credentials: "include"
    }).then(response => response.json())

export const register = (user) =>
    fetch(`http://localhost:8080/register`, {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'content-type': 'application/json'
      },
      credentials: "include"
    }).then(response => response.json())


export const login = (user) =>
    fetch(`http://localhost:8080/login`, {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'content-type': 'application/json'
      },
      credentials: "include"
    }).then(response => response.json())
