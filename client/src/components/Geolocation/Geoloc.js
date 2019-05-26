import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';

class Geoloc extends React.Component {  
  constructor() {
    super()

    this.state = {
      latitude: '',
      longitude: '',
      locations: [],
      selectedLoc : ''
    }

    this.getMyLocation = this.getMyLocation.bind(this)
    this.onlocChanged = this.onlocChanged.bind(this)
  }
  
  componentDidMount() {
    this.getMyLocation()
  }
  onlocChanged = changeEvent => {
      var selectedObj = this.state.locations.find(it => it.id === changeEvent.target.value);
      if (selectedObj !== undefined || selectedObj !== null){
        document.getElementById('title').value = selectedObj.title;
        document.getElementById('vicinity').value = selectedObj.vicinity.replace('<br/>' , ', ');
        document.getElementById('propertyId').value = selectedObj.id;
      }
 
  }

  getMyLocation() {
    const location = window.navigator && window.navigator.geolocation
    const __app_code = "5jLegdvPrJqNuM4uTozN9g";
    const __app_id = "aEGh1zJ0shGezyfEAlsK";
    if (location) {
      location.getCurrentPosition((position) => {
         const latlng = position.coords.latitude + "," + position.coords.longitude;
         const __key = "app_id=" + __app_id + "&app_code=" + __app_code;
         const url = `https://places.cit.api.here.com/places/v1/autosuggest?at=${latlng}&q=property&${__key}`;
        //  const aroundURl = `https://places.cit.api.here.com/places/v1/discover/around?${__key}&at=${latlng}`;
         console.log(url);
         fetch(url)
        .then(response =>response.json())
        //.then(data => alert(JSON.stringify(data.results.items)))
        .then(data => this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          locations : data.results
        }));
      }, (error) => {
        this.setState({ latitude: 'err-latitude', longitude: 'err-longitude' })
      })
    }

  }
  

  render() {
    return !this.props.isGeolocationAvailable
      ? <div>Your browser does not support Geolocation</div>
      : !this.props.isGeolocationEnabled
        ? <div>Geolocation is not enabled</div>
        :  this.state.latitude + ","+ this.state.longitude
          ?<div>
               <div className="list-container">  
                  <ul className="collection">
                   {this.state.locations ? this.state.locations.map((item)=>(
                    <li key={item.href} className="collection-item">   
                             <label> 
                               {/* <img src = {item.icon} alt={item.title}></img> */}
                              <input type="radio" name="location" className="card-input-element" value= {item.id} 
                                // checked={this.state.selectedLoc === item.id} 
                                onChange={this.onlocChanged} />
                                <p className="card-input">
                                  {item.title}
                                </p>
                            </label>
                     </li>
                      )):  <div>Getting Location data failed</div>}
                  </ul>
                </div>
          </div>
          : <div>Getting the location data&hellip; </div> ;
  }
}


export default Geoloc;
