import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import TrendingList from './components/TrendingList.jsx';
import styles from './app.module.css';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sortedbyRecency: [],
      sortedbyQuantityBought: [],
      display: [],
      sortBool: true,
      buttonComment: 'Show Recency'
    }
    this.getTrendingData = this.getTrendingData.bind(this)
    this.toggleOtherSort = this.toggleOtherSort.bind(this)
  }


  componentDidMount() {
    this.getTrendingData();
  }

  getTrendingData() {
    axios
      .get('/salesRecords')
      .then((response) => {
        this.setState({
          sortedbyRecency: response.data[0],
          sortedbyQuantityBought: response.data[1],
          display: response.data[1]
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  toggleOtherSort () {
    this.setState({
      sortBool: !this.state.sortBool
    })
    if (this.state.sortBool) {
      this.setState({
        buttonComment: 'Show Recency',
        display: this.state.sortedbyQuantityBought
      })
    } else {
      this.setState({
        buttonComment: 'Show Top Orders',
        display: this.state.sortedbyRecency
      })
    }
  }

  render() {
    return (
      <div className={styles.container}>
        <img className={styles.image} src='https://www.snackpass.co/static/media/logo_round_2.d74f1dd2.png' alt="" />
        <TrendingList trendinglist={this.state.display} buttonComment={this.state.buttonComment} toggleOtherSort={this.toggleOtherSort} />
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));