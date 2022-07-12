const db = require('./index.js');
var faker = require('faker');

const randomDate = (start, end) => {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
  }

const getRandomKind = () => {
    let kinds = ['New Patient', 'Follow-up']

    return kinds[Math.floor(Math.random() * 2)]
  }

const firstName = ['John', 'Henry', 'Bob', 'Samantha']
const lastName = ['Tang', 'Tran', 'Truong', 'Wong']

const generator = () => {
    let doctorUuid = 1
    let appointmentUuid = 1
    for (let i = 0; i < 100; i++) {
        let fName = firstName[[Math.floor(Math.random() * 4)]]
        let lName = lastName[[Math.floor(Math.random() * 4)]]
        const data = new db.AppointmentAPI({
            doctorUuid: doctorUuid,
            doctorFirstName: fName,
            doctorLastName: lName,
            doctorFullName: `${fName} ${lName}`,
            appointmentUuid: appointmentUuid,
            patientFirstName: faker.name.firstName(),
            patientLastName: faker.name.lastName(),
            dateAndTime: randomDate(new Date(2022, 7, 12), new Date(), 0, 23),
            kind: getRandomKind(),
        })
        db.saveAppointmentAPIRecords(data)
        doctorUuid++
        appointmentUuid++
    }
    
    return console.log("Data has successfully seeded!")
}

generator()
