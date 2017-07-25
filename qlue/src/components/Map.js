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
    iconUrl: 'http://www.freeiconspng.com/uploads/traffic-icon-1.png',
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
      waze: {},
      terminalIcons: true,
      wazeIcons: true
    }
  }
  
  render(){
    return(
      <div>      
      <div id='cssmenu'>
          <ul>
            {(this.state.wazeIcons === true)
            ? <li><a onClick={()=> this.wazeIcons()}><span>Clear Traffic</span></a></li>
            : <li><a onClick={()=> this.wazeIcons()}><span>Show Traffic</span></a></li>
            }
            {(this.state.terminalIcons === true)
            ? <li><a onClick={()=> this.terminalIcons()}><span>Clear Terminals</span></a></li>
            : <li><a onClick={()=> this.terminalIcons()}><span>Show Terminals</span></a></li>
            }

          </ul>
        </div>
        <Map center={Jakarta} zoom={12}>
          <TileLayer
            url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
        {(this.state.markers.length > 0 && this.state.terminalIcons === true)
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
        :<div></div>
      }
        {(this.state.waze.length > 0 && this.state.wazeIcons === true)
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
        :<div></div>
      }
    </Map>
  </div>
    )
  }
  
  wazeIcons(){
    if(this.state.wazeIcons === false){
      this.setState({
        wazeIcons: true
      })
    } else{
      this.setState({
        wazeIcons: false
      })
    }
  }
  
  terminalIcons(){
    if(this.state.terminalIcons === false){
      this.setState({
        terminalIcons: true
      })
    } else{
      this.setState({
        terminalIcons: false
      })
    }
  }
  
  componentWillMount(){
    axios.get(`http://www.qlue.co.id/vacancy/svc/getDataExample.php`)
    .then(terminals=>{
      this.setState({
        markers: terminals.data
      })
    })
    axios.get(`http://waze.qlue.id/jakarta/update/0atxn84I3hx2WmNm5ifPDZkJaLERZD9A.json`)
    .then(waze=>{
      this.setState({
        waze: waze.data.alerts
      })
    })
  }
}

export default QlueMap