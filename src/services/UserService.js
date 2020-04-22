import {API_URL} from '../common/ApiConstants';

// CREATE
export const register = (user) =>
    fetch(`${API_URL}/register`, {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'content-type': 'application/json'
      },
      credentials: "include"
    }).then(response => response.json())

// READ
export const areEmailAndUsernameAvailable = (user) =>
    fetch(`${API_URL}/register/validate`, {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'content-type': 'application/json'
      }
    }).then(response => response.json());


// READ
export const findUser = () =>
    fetch(`${API_URL}/profile`, {
      method: 'POST',
      credentials: "include"
    })
    .then( response => response.json())
    .catch(res => '');

// READ
export const findPublicProfile = (username) =>
    fetch(`${API_URL}/api/user/${username}`, {
      method: 'GET'
    })
    .then( response => response.json())
    .catch(res => '');


// DELETE
export const deleteUser = () =>
    fetch(`${API_URL}/profile`, {
      method: 'DELETE',
      credentials: "include"
    }).then(response => response.json())
    .catch(res => '');


// UPDATE
export const updateUser = (user) =>
    fetch(`${API_URL}/profile`, {
      method: 'PUT',
      body: JSON.stringify(user),
      headers: {
        'content-type': 'application/json'
      },
      credentials: "include"
    }).then(response => response.json())
      .catch(res => '');


// LOGOUT
export const logout = () =>
    fetch(`${API_URL}/logout`, {
      method: 'POST',
      credentials: "include"
    }).then(response => response.json())
    .catch(() => '');

// LOGIN
export const login = (user) =>
    fetch(`${API_URL}/login`, {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'content-type': 'application/json'
      },
      credentials: "include"
    }).then(response => response.json())
    .catch(res => '');



export default {
  register,
  findUser,
  findPublicProfile,
  deleteUser,
  updateUser,
  logout,
  login
}
