import React from 'react';
import { Restaurant } from '../../api/restaurants';

export default class App extends React.Component {
  renderRestaurants() {
    if(!this.props.restaurants)
        return <div>No data</div>;
    return this.props.restaurants.map(r => <div key={r._id}>{r._id}, {r.name}</div>);
  }
  render() {
    console.log(this.props.restaurants);
    return <div>{this.renderRestaurants()}</div>;
  }
}