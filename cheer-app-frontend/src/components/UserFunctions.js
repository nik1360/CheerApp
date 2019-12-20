
import axios from 'axios'

export const loginUser = user => {
  return axios
    .post('users/login', {
      username: user.u,
      password: user.p
    })
    .then(response => {
      localStorage.setItem('usertoken', response.data)
      return response.data
    })
    .catch(err => {
      console.log(err)
    })
}

export const loginOrganizer = organizer => {
  return axios
    .post('organizers/login', {
      username: organizer.u,
      password: organizer.p
    })
    .then(response => {
      localStorage.setItem('usertoken', response.data)
      return response.data
    })
    .catch(err => {
      console.log(err)
    })
}
  
export const logout = () => {
  return axios
    .post('/logout', {
      
    })
    .then(response => {
      localStorage.setItem('usertoken', response.data)
      return response.data
    })
    .catch(err => {
      console.log(err)
    })
}

export const registerOrganizer = org => {
  return axios
    .post('organizers/register', {
      username: org.usr,
      email: org.email,
      password: org.pwd,
      firstname: org.firstname,
      lastname: org.lastname,
      dateofbirth: org.dateofbirth,
      phonenumber:org.phonenumber
    })
    .then(response => {
      localStorage.setItem('usertoken', response.data)
      return response.data
    })
    .catch(err => {
      console.log(err)
    })
}