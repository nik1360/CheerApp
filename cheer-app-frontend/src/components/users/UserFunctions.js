
import axios from 'axios'

export const loginUser = async user => {
  try {
    const response = await axios
      .post('login/user', {
        username: user.u,
        password: user.p
      })
    return response.data
  }
  catch (err) {
    console.log(err)
  }
}

export const loginOrganizer = async organizer => {
  try {
    const response = await axios
      .post('/login/organizer', {
        username: organizer.u,
        password: organizer.p
      })
    return response.data
  }
  catch (err) {
    console.log(err)
  }
}
  
export const logout = async () => {
  try {
    const response = await axios
      .post('/logout', {})
    return response.data
  }
  catch (err) {
    console.log(err)
  }
}

export const registerOrganizer = async org => {
  try {
    const response = await axios
      .post('/register/organizer', {
        username: org.usr,
        email: org.email,
        password: org.pwd,
        firstname: org.firstname,
        lastname: org.lastname,
        dateofbirth: org.dateofbirth,
        phonenumber: org.phonenumber
      })
    return response.data
  }
  catch (err) {
    console.log(err)
  }
}

export const registerUser = async usr => {
  try {
    const response = await axios
      .post('/register/user', {
        username: usr.usr,
        email: usr.email,
        password: usr.pwd,
        firstname: usr.firstname,
        lastname: usr.lastname,
        dateofbirth: usr.dateofbirth,
        city: usr.city,
        nationality: usr.nationality,
        flagrock: usr.flagrock,
        flaghiphop: usr.flaghiphop,
        flagreggae: usr.flagreggae,
        flagreggaeton: usr.flagreggaeton,
        flagtechno: usr.flagtechno,
        flagelectronic: usr.flagelectronic
      })
    return response.data
  }
  catch (err) {
    console.log(err)
  }
}

export const getUserDetails = async user => {
  try {
    const response = await axios
      .post('/users/'+user.username+'/getDetails', {
        username: user.username,
      })
    return response.data
  }
  catch (err) {
    console.log(err)
  }
}

export const findUsers = async search => {
  try {
    const response = await axios
      .post('/users/search', {
        username: search.username,
        city: search.city,
        flagrock: search.flagrock,
        flaghiphop: search.flaghiphop,
        flagreggae: search.flagreggae,
        flagreggaeton: search.flagreggaeton,
        flagtechno: search.flagtechno,
        flagelectronic: search.flagelectronic,
        criteriacity: search.criteriacity,
        criteriausername: search.criteriausername,
        criteriagenres: search.criteriagenres,
      })
    return response.data
  }
  catch (err) {
    console.log(err)
  }
}

export const addUserAsFriend = async friends => {
  try {
    const response = await axios
      .post('/users/'+friends.username2+'/addFriend', {
        loggedusername: friends.loggedusername,
        username2: friends.username2
      })
    return response.data
  }
  catch (err) {
    console.log(err)
  }
}

export const checkIfFriend = async friends => {
  try {
    const response = await axios
      .post('/users/'+friends.username2+'/checkFriend', {
        loggedusername: friends.loggedusername,
        username2: friends.username2
      })
    return response.data
  }
  catch (err) {
    console.log(err)
  }
}

export const deleteFriend = async friends => {
  try {
    const response = await axios
      .post('/users/'+friends.username2+'/deleteFriend', {
        loggedusername: friends.loggedusername,
        username2: friends.username2
      })
    return response.data
  }
  catch (err) {
    console.log(err)
  }
}