import React,{Component} from 'react'
import { GoogleMap, Marker } from "react-google-maps";

const googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.27&libraries=places,geometry&key=AIzaSyCum7TiqWXTpOkMr8jkijFRBKGOyzk1exc"

class RGoogleMap extends Component{
  constructor(props){
    super(props)
    this.state={
      
    }
  }
  render(){
    return(
      <div>
      <GoogleMap
        defaultZoom={3}
        defaultCenter={{ lat: -25.363882, lng: 131.044922 }}
        googleMapURL={googleMapURL}
          >
      </GoogleMap>
    </div>
    )
  }
}

export default RGoogleMap