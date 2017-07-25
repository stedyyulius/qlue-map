import React, {Component} from 'react'
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import axios from 'axios'

const position = [51.505, -0.09];

class QlueMap extends Component {
  constructor(props){
    super(props)
    this.state={
      markers:{}
    }
  }
  
  render(){
    return(
        <Map center={position} zoom={0}>
          <TileLayer
            url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          /><button type="button" onClick={()=>this.tes()}>tes</button>
        {(this.state.markers.length > 0)
         ?this.state.markers.map((m,index) => (
           <Marker
            key={index} 
            position={[+m.lat,+m.lng]}>
            <Popup>
              <span>A pretty CSS3 popup.<br/>Easily customizable.</span>
            </Popup>
           </Marker> 
        ))
        :<div><img src="https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif" 
              alt="loading"/></div>
      }
        </Map>
    )
  }
  
  tes(){
    console.log(this.state.markers);
  }
  
  componentWillMount(){
    axios.get(`http://www.qlue.co.id/vacancy/svc/getDataExample.php`)
    .then(markers=>{
      this.setState({
        markers: markers.data
      })
    })
  }
}

export default QlueMap