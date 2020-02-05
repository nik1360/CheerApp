import axios from 'axios'
import api from '../Config'


export const findEvents = async search => {
  try {
    const response = await axios
      .post(api+'/events/search', {
        date: search.date,
        city: search.city,
        flagrock: search.flagrock,
        flaghiphop: search.flaghiphop,
        flagreggae: search.flagreggae,
        flagreggaeton: search.flagreggaeton,
        flagtechno: search.flagtechno,
        flagelectronic: search.flagelectronic,
        criteriacity: search.criteriacity,
        criteriadate: search.criteriadate,
        criteriagenres: search.criteriagenres,
      })
    return response.data
  }
  catch (err) {
    console.log(err)
  }
}

export const retrieveOrganizerDetails = async event => {
  try {
    const response = await axios
    
      .post(api+'/events/'+event.code+'/ask', {
        username: event.organizer_username,
        code: event.code 
        
      })
    return response.data
  }
  catch (err) {
    console.log(err)
  }
}

export const createEvent = async event => {
  try {
    const response = await axios
      .post(api+'/register/event', {
        name:event.name,
        description: event.description,
        date:event.date,
        start_time: event.starttime,
        end_time: event.endtime,
        city:event.city,
        address:event.address,
        venue:event.venue,
        price:event.price,
        flagrock:event.flagrock,
        flaghiphop: event.flaghiphop,
        flagreggae:event.flagreggae,
        flagreggaeton:event.flagreggaeton,
        flagtechno:event.flagtechno,
        flagelectronic:event.flagelectronic,
        organizer: event.organizer 
      })
    return response.data
  }
  catch (err) {
    console.log(err)
  }
}

export const insertRating = async rating => {
  try {
    const response = await axios
      .post(api+'/events/' + rating.event_code + '/rate', {
        event_code: rating.event_code,
        user_username: rating.user_username,
        organizer_username:rating.organizer_username,
        rating_value: rating.rating_value
      })
    return response.data
  }
  catch (err) {
    console.log(err)
  }
}

export const deleteRating = async rating => {
  try {
    const response = await axios
      .post(api+'/events/' + rating.event_code + '/deleteRating', {
        event_code: rating.event_code,
        organizer_username: rating.organizer_username,
        user_username: rating.user_username,
      })
    return response.data
  }
  catch (err) {
    console.log(err)
  }
}

export const userAttendsEvent = async event => {
  try {
    const response = await axios
      .post(api+'/events/' + event.event_code + '/attend', {
        event_code: event.event_code,
        user_username: event.user_username,
      })
    return response.data
  }
  catch (err) {
    console.log(err)
  }
}

export const userNotAttendsEvent = async event => {
  try {
    const response = await axios
      .post(api+'/events/' + event.event_code + '/notAttend', {
        event_code: event.event_code,
        user_username: event.user_username,
      })
    return response.data
  }
  catch (err) {
    console.log(err)
  }
}

export const userEventStatus = async event => {
  try {
    const response = await axios
      .post(api+'/events/' + event.event_code + '/userstatus', {
        event_code: event.event_code,
        user_username: event.user_username,
      })
    return response.data
  }
  catch (err) {
    console.log(err)
  }
}

export const getEventDetails = async event => {
  try {
    const response = await axios
      .post(api+'/events/' + event.event_code + '/getDetails', {
        event_code: event.event_code,
      })
    return response.data
  }
  catch (err) {
    console.log(err)
  }
}

export const suggestAnEvent = async struct => {
  try {
    const response = await axios
      .post(api+'/suggestEvent', {
        logged_username: struct.logged_username,
        today_date: struct.today_date
      })
    return response.data
  }
  catch (err) {
    console.log(err)
  }
}

export const inviteToEvent = async struct => {
  try {
    const response = await axios
      .post(api+'/events/' + struct.event_code + '/inviteFriend', {
        sender: struct.sender,
        recipient: struct.recipient,
        event_code: struct.event_code,
        event_name: struct.event_name
      })
    return response.data
  }
  catch (err) {
    console.log(err)
  }
}
