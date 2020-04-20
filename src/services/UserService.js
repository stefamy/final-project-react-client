// import {API_URL} from '../common/constants';

// CREATE
export const register = (user) =>
    fetch(`http://localhost:8080/register`, {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'content-type': 'application/json'
      },
      credentials: "include"
    }).then(response => response.json())

// READ
export const findUser = () =>
    fetch(`http://localhost:8080/profile`, {
      method: 'POST',
      credentials: "include"
    })
    .then( res => res.json())
    .catch(() => '');

// READ
export const findPublicProfile = (username) =>
    fetch(`http://localhost:8080/api/user/${username}`, {
      method: 'GET'
    })
    .then( res => res.json());


// DELETE
export const deleteUser = () =>
    fetch(`http://localhost:8080/profile`, {
      method: 'DELETE',
      credentials: "include"
    }).then(response => response.json());


// UPDATE
export const updateUser = (user) =>
    fetch(`http://localhost:8080/profile`, {
      method: 'PUT',
      body: JSON.stringify(user),
      headers: {
        'content-type': 'application/json'
      },
      credentials: "include"
    }).then(response => response.json())


// LOGOUT
export const logout = () =>
    fetch(`http://localhost:8080/logout`, {
      method: 'POST',
      credentials: "include"
    }).then(response => response.json())
    .catch(() => '');

// LOGIN
export const login = (user) =>
    fetch(`http://localhost:8080/login`, {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'content-type': 'application/json'
      },
      credentials: "include"
    }).then(response => response.json())



export default {
  register,
  findUser,
  findPublicProfile,
  deleteUser,
  updateUser,
  logout,
  login
}
