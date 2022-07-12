const express = require('express')
const getAppointmentAPIRecords = require('../database/index')
const getListOfDoctors = require('../database/index')
const getListofDoctorsAppointmentOnDay = require('../database/index')
const deleteAppointment = require('../database/index')
const saveAppointmentAPIRecords = require('../database/index')

let app = express()

app.use(express.static(__dirname + '/../client/dist'))

app.get('/appointments', function (req, res) {
  return getAppointmentAPIRecords.getAppointmentAPIRecords((err, results) => {
    if (err) {
      console.log(err)
    } else {
      res.send(results)
    }
  })
})

app.get('/doctors', function (req, res) {
  return getListOfDoctors.getListOfDoctors((err, results) => {
    if (err) {
      console.log(err)
    } else {
      res.send(results)
    }
  })
})

app.get('/doctorsOfDay', function (req, res) {
  return getListofDoctorsAppointmentOnDay.getListofDoctorsAppointmentOnDay((err, results) => {
    if (err) {
      console.log(err)
    } else {
      res.send(results)
    }
  })
})


app.get('/deleteAppointment', function (req, res) {
  return deleteAppointment.deleteAppointment(req)
})

app.get('/saveAppointmentAPIRecords', function (req, res) {
  return saveAppointmentAPIRecords.saveAppointmentAPIRecords(req)
})

let port = 8080

app.listen(port, function() {
  console.log(`listening on port ${port}`)
})
