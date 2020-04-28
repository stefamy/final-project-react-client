import {API_URL} from '../common/ApiConstants';

// CREATE - With username, email, and password
export const register = (user) =>
    fetch(`${API_URL}/register`, {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'content-type': 'application/json'
      },
      credentials: "include"
    }).then(response => response.json())


// READ - Check username and email available
export const areEmailAndUsernameAvailable = (user) =>
    fetch(`${API_URL}/register/validate`, {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'content-type': 'application/json'
      }
    }).then(response => response.json());


// LOGIN - With username and password
export const login = (user) =>
    fetch(`${API_URL}/login`, {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'content-type': 'application/json'
      },
      credentials: "include"
    }).then(response => response.json())
    .catch(res => null);


// LOGOUT - From current user HTTP credentials
export const logout = () =>
    fetch(`${API_URL}/logout`, {
      method: 'POST',
      credentials: "include"
    }).then(response => response.json())
    .catch(() => '');

// READ - From HTTP credentials
export const findCurrentUser = () =>
    fetch(`${API_URL}/user`, {
      method: 'POST',
      credentials: "include"
    })
    .then( response => response.json())
    .catch(res => '');

// READ - Upcoming event data from HTTP credentials
export const findCurrentUserData = () =>
    fetch(`${API_URL}/user/upcoming`, {
      method: 'POST',
      credentials: "include"
    })
    .then( response => response.json())
    .catch(res => '');


// UPDATE - User account
export const updateCurrentUser = (user) =>
    fetch(`${API_URL}/user`, {
      method: 'PUT',
      body: JSON.stringify(user),
      headers: {
        'content-type': 'application/json'
      },
      credentials: "include"
    }).then(response => response.json())
    .catch(res => '');


// DELETE - User account
export const deleteCurrentUser = () =>
    fetch(`${API_URL}/user`, {
      method: 'DELETE',
      credentials: "include"
    }).then(response => response.json())
    .catch(res => '');


// READ - From username
export const findPublicProfile = (username) =>
    fetch(`${API_URL}/api/user/${username}`, {
      method: 'GET'
    })
    .then( response => response.json())
    .catch(res => '');


export default {
  register,
  login,
  logout,
  findCurrentUser,
  findCurrentUserData,
  updateCurrentUser,
  deleteCurrentUser,
  findPublicProfile
}
