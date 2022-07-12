import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import styles from './app.module.css';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      appointments: [],
      doctors: []
    }
    this.getAppointmentData = this.getAppointmentData.bind(this)
    this.getListOfDoctors = this.getListOfDoctors.bind(this)
  }


  componentDidMount() {
    this.getAppointmentData();
    this.getListOfDoctors();
  }

  getAppointmentData() {
    axios
      .get('/appointments')
      .then((response) => {
        this.setState({
          appointments: response.data
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  getListOfDoctors() {
    axios
      .get('/doctors')
      .then((response) => {
        this.setState({
          doctors: response.data
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <div className={styles.container}>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));