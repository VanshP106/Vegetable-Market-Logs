import React, { Component } from "react";
import "./Map.css";
class Map extends Component {
  constructor(props) {
    super(props);
    this.mapRef = React.createRef();
  }

  componentDidMount() {
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyAUJgTTjLKRiD2VDevZBfrLWTODElL1CbU&callback=initMap`; 
    script.defer = true;
    script.async = true;
    script.onerror = this.onScriptError;
    document.head.appendChild(script);
    script.addEventListener("load", this.onScriptLoad);
  }

  onScriptLoad = () => {
    this.map = new window.google.maps.Map(this.mapRef.current, {
      center: { lat: 28.572264, lng: 77.165207 },
      zoom: 14,
    });
    new window.google.maps.Marker({
      position: { lat: 28.572264, lng: 77.165207 }, 
      map: this.map,
      title: "Fresh Veggies",
    });
  };

  onScriptError = () => {
    console.error("Error loading Google Maps API script.");
  };

  render() {
    return <div ref={this.mapRef} style={{ width: "100%", height: "300px" }} />;
  }
}

export default Map;
