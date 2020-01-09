import axios from 'axios'

export const findEvents = async search => {
  try {
    const response = await axios
      .post('/events/search', {
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
    
      .post('/events/'+event.code+'/ask', {
        username: event.organizer_username,
        code: event.code 
        
      })
    return response.data
  }
  catch (err) {
    console.log(err)
  }
}
