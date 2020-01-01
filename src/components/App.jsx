import React, { Component } from 'react';
import axios from 'axios'

import SearchForm from './SearchForm'
import GeocodeResult from './GeocodeResult'
const GEOCODE_ENDPOINT = `https://maps.googleapis.com/maps/api/geocode/json?key=${process.env.GEOLOCATION_API_KEY}`;

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  handlePlaceSubmit(place) {
    axios.get(GEOCODE_ENDPOINT, {
      params: { address: place }
    }).then(results => {

      const data = results.data;
      const result = results.data.results[0];

      switch (data.status) {
        case 'OK':
          const location = result['geometry']['location'];

          this.setState({
            address: result.formatted_address,
            lat: location.lat,
            lng: location.lng,
          });

          break;
        case 'ZERO_RESULTS':
          this.setState({
            address: '結果が見つかりませんでした',
            lat: 0,
            lng: 0,
          });
          break;
        default:
          this.setState({
            address: 'エラーが発生しました',
            lat: 0,
            lng: 0,
          });
      }


    }).catch((e) => {
      this.setState({
        address: e.toString(),
        lat: 0,
        lng: 0,
      })
    })
  }

  render() {
    return (
      <div>
        <h1>緯度経度検索</h1>
        <SearchForm onSubmit={
          place => this.handlePlaceSubmit(place)
        } />
        <GeocodeResult
          address={this.state.address}
          lat={this.state.lat}
          lng={this.state.lng}
        />
      </div>
    )
  }
}
