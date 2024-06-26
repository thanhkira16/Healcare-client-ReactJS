import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

class GoogleMap extends Component {
  render() {
    const mapStyles = {
      width: '100%',
      height: '300px',
    };

    return (
      <Map
        google={this.props.google}
        zoom={14}
        style={mapStyles}
        initialCenter={{ lat: 37.774929, lng: -122.419416 }} // Tọa độ ban đầu của bản đồ
      >
        <Marker position={{ lat: 37.774929, lng: -122.419416 }} /> {/* Đánh dấu vị trí trên bản đồ */}
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'YOUR_GOOGLE_MAPS_API_KEY_HERE' // Thay YOUR_GOOGLE_MAPS_API_KEY_HERE bằng API key của bạn
})(GoogleMap);
