import React from 'react';
import FoodMap from './FoodMap'
import FoodList from './FoodList'
import Home from '../home/Home'
import { Redirect } from 'react-router'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

class FoodHome extends React.Component {

  render() {
    if (this.props.logout) {
      return <Redirect to='/login' />
    }

    return (
      <div>
      <Link to='/home' id='Link'><button id="home-button"><i className="em em-house"></i></button></Link><br /><br />
      <Router>
          <div>
            <Link to='/foodmap' id='link'><button id="try-new">Try something new in the area</button></Link>{' '}
            <Link to='/food' id='link'><button id="no-try">Not in the mood for exploring</button></Link>

            <Route path='/foodmap' component={() => <FoodMap />} />
            <Route path='/food' component={() => <FoodList />} />

          </div>
          </Router>

      </div>
    );
  }

}

export default FoodHome;
