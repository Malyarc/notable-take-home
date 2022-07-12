const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/AppointmentAPI', { useNewUrlParser: true, useUnifiedTopology: true })

let appointmentAPISchema = mongoose.Schema({
    doctorUuid: String,
    doctorFirstName: String,
    doctorLastName: String,
    doctorFullName: String,
    appointmentUuid: String,
    patientFirstName: String,
    patientLastName: String,
    dateAndTime: String,
    kind: String,
})

const AppointmentAPI = mongoose.model('AppointmentAPI', appointmentAPISchema)

const saveAppointmentAPIRecords = (data) => {
    data.save((err, record) => {
        if (err) {
            return (err, null)
        }
        return (null, record)
    })
}

const getAppointmentAPIRecords = (callback) => {
    AppointmentAPI.find({}, (err, results) => {
        if (err) {
          callback(err)
        } else {
        callback(err, results)
        }
      })
}

const getListOfDoctors = (callback) => {
    AppointmentAPI.find({}, (err, results) => {
        if (err) {
          callback(err)
        } else {
        let doctors = {}
        for (let i = 0; i < results.length; i++) {
            doctors[`${results[i].doctorFirstName} ${results[i].doctorLastName}`] = 0
        }
        callback(err, Object.keys(doctors))
        }
      })
}

const getListofDoctorsAppointmentOnDay = (doctor, time, callback) => {
    AppointmentAPI.find({doctorFullName: doctor, dateAndTime: {$in : time}}, (err, results) => {
        if (err) {
          callback(err)
        } else {
        callback(err, Object.keys(results))
        }
      })
}

const deleteAppointment = (appointmentUuid, callback) => {
    try {
        AppointmentAPI.deleteOne({appointmentUuid: appointmentUuid})
    } catch (e) {
        console.log(e)
    }
}


module.exports = {
    AppointmentAPI,
    saveAppointmentAPIRecords,
    getAppointmentAPIRecords,
    getListOfDoctors,
    getListofDoctorsAppointmentOnDay,
    deleteAppointment,
  }
  