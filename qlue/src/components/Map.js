import React, {Component} from 'react'
import { divIcon, icon } from 'leaflet';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import DivIcon from 'react-leaflet-div-icon';
import axios from 'axios'

const Jakarta = [-6.2, 106.8689];
var Terminal = icon({
    iconUrl: 'http://www.qlue.co.id/vacancy/svc/icon-marker.png',
    iconSize: [30, 30],
    iconAnchor: [22, 94],
    popupAnchor: [-3, -76],
    shadowSize: [68, 95],
    shadowAnchor: [22, 94]
});

var Traffic = icon({
    iconUrl: 'https://s-media-cache-ak0.pinimg.com/originals/cd/44/f9/cd44f96b2ac5b7361bf53c77e2fd5d3d.png',
    iconSize: [30, 30],
    iconAnchor: [22, 94],
    popupAnchor: [-3, -76],
    shadowSize: [68, 95],
    shadowAnchor: [22, 94]
});


class QlueMap extends Component {
  constructor(props){
    super(props)
    this.state={
      markers:{},
      waze: {}
    }
  }
  
  render(){
    return(<div>
        <button onClick={()=>this.tes()}>Tes</button>
        <Map center={Jakarta} zoom={12}>
          <TileLayer
            url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
        {(this.state.markers.length > 0)
         ?this.state.markers.map((m,index) => (
           <Marker
             key={index} 
             position={[+m.lat,+m.lng]}
             icon={Terminal}>
            <Popup>
              <span>
                <b>{m.name}</b>
                <br />
                {m.address}
              </span>
            </Popup>
          </Marker>          
        ))
        :<div><img src="https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif" 
              alt="loading"/></div>
      }
        {(this.state.waze.length > 0)
         ?this.state.waze.map((w,index) => (
           <Marker
             key={index} 
             position={[w.location.y,w.location.x]}
             >
            <Popup>
              <span>
                <b>{w.street}</b>
                <br />
                {w.subtype}
              </span>
            </Popup>
          </Marker>          
        ))
        :<div><img src="https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif" 
              alt="loading"/></div>
      }
    </Map></div>
    )
  }
  
  tes(){
    console.log(this.state.markers);
  }
  
  componentWillMount(){
    axios.get(`http://www.qlue.co.id/vacancy/svc/getDataExample.php`)
    .then(terminals=>{
      console.log(terminals.data);
      this.setState({
        markers: terminals.data
      })
    })
    axios.get(`http://waze.qlue.id/jakarta/update/0atxn84I3hx2WmNm5ifPDZkJaLERZD9A.json`)
    .then(waze=>{
      console.log(waze.data.alerts[0].location.x);
      this.setState({
        waze: waze.data.alerts
      })
    })
  }
}

export default QlueMap