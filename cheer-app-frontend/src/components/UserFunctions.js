
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
  

