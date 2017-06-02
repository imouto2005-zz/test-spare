import React from 'react'
import axios from 'axios'
import localforage from 'localforage'

class SuggestedActivities extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      results: []
    };
  }

  componentDidMount() {
    this.getMeetups()
  }

  getMeetups() {
    console.log('GETTING MEETUPS!!');
    localforage.getItem('appName')
    .then((authInfo) => {
      const headers = typeof authInfo === "string" ? JSON.parse(authInfo) : authInfo
      return axios({
        method: 'GET',
        url: 'https://project4backend.herokuapp.com/activities/meetups',
        headers,
      }).then((response) => {
        console.log('response here', response)
        this.setState({
          results: response.data
        })
      })
    })
  }

  render() {
    console.log('state.results here', this.state.results)

    return (
      <div>
        <h2 id="meetup-header"><i className="em em-sparkles"></i> Join a cool event here! <i className="em em-sparkles"></i></h2>
        <div className="meetup-results">
          {
            this.state.results.map((item) => {
              if (item.venue) {
                return (
                    <p className="meetup-items">
                    <b><a href={item.link}><span id="meetup-title">{item.name}</span></a></b><br />
                    <i className="em em-busts_in_silhouette"></i> {item.group.who}<br />
                    <i className="em em-pushpin"></i> {item.venue.name}, {item.venue.address_1}<br />
                  </p>
                )
              } else {
                return (
                    <p className="meetup-items">
                    <b><a href={item.link}><span id="meetup-title">{item.name}</span></a></b><br />
                    <i className="em em-busts_in_silhouette"></i> {item.group.who}<br />
                    <i className="em em-warning"></i> Please refer to the meetup page for location details!<br />
                  </p>
                )
              }
            })
          }
          <p> <i className="em em-tada"></i> You have reached the end of the page!</p>
        </div>
      </div>
    );
  }

}

export default SuggestedActivities;
