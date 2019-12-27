
import axios from 'axios'

export const loginUser = user => {
  return axios
    .post('login/user', {
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
    .post('login/organizer', {
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
    .post('register/organizer', {
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

export const registerUser = usr => {
  return axios
    .post('register/user', {
      username: usr.usr,
      email: usr.email,
      password: usr.pwd,
      firstname: usr.firstname,
      lastname: usr.lastname,
      dateofbirth: usr.dateofbirth,
      city:usr.city,
      nationality: usr.nationality,
      flagrock:usr.flagrock,
      flaghiphop:usr.flaghiphop,
      flagreggae:usr.flagreggae,
      flagreggaeton:usr.flagreggaeton,
      flagtechno:usr.flagtechno,
      flagelectronic:usr.flagelectronic
    })
    .then(response => {
      localStorage.setItem('usertoken', response.data)
      return response.data
    })
    .catch(err => {
      console.log(err)
    })
}