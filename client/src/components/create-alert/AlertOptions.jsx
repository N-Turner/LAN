import React from 'react';

const AlertOptions = ({ latitude, longitude, appContext, handleAlertOptions }) => {
  navigator.geolocation.watchPosition((position) => {
    appContext.setState({
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    }, () => {
      // console.log('Updated coordinates: ', position.coords.latitude, position.coords.longitude);
    });
  });
  return latitude !== 'Loading...'
    ? (
      <div>
        <div className="lat-long-container">
          Current coordinates:
          <br />
          {`${latitude}, ${longitude}`}
        </div>
        <div className="category-buttons-container">

          <button id="hurricane-button" className="category-button" type="button" value="Hurricane" onClick={e => handleAlertOptions(e.currentTarget.value)}>{/*<img className="cat-icon" src={require('../../../button-icons/013-hurricane.png')} value="hurricane" alt="hurricane" />*/}
          <div className="button-content"></div>
          </button>

          <button id="flood-button" className="category-button" type="button" value="Flood" onClick={e => handleAlertOptions(e.currentTarget.value)}>{/*<img className="cat-icon" src={require('../../../button-icons/016-flood.png')} alt="flood" />*/}</button>

          <button id="forest-fire-button" className="category-button" type="button" value="Forest Fire" onClick={e => handleAlertOptions(e.currentTarget.value)}>{/*<img className="cat-icon" src={require('../../../button-icons/015-fire.png')} alt="forest fire" />*/}</button>

          <button id="house-fire-button" className="category-button" type="button" value="House Fire" onClick={e => handleAlertOptions(e.currentTarget.value)}>{/*<img className="cat-icon" src={require('../../../button-icons/014-house.png')} alt="forest fire" />*/}</button>

          <button id="earthquake-button" className="category-button" type="button" value="Earthquake" onClick={e => handleAlertOptions(e.currentTarget.value)}>{/*<img className="cat-icon" src={require('../../../button-icons/018-earthquake.png')} alt="earthquake" />*/}</button>

          <button id="landslide-button" className="category-button" type="button" value="Landslide" onClick={e => handleAlertOptions(e.currentTarget.value)}>{/*<img className="cat-icon" src={require('../../../button-icons/006-landslide-2.png')} alt="landslide" />*/}</button>

          <button id="traffic-accident-button" className="category-button" type="button" value="Traffic Accident" onClick={e => handleAlertOptions(e.currentTarget.value)}>{/*<img className="cat-icon" src={require('../../../button-icons/car-collision (1).png')} alt="traffic-accident" />*/}</button>

          <button id="volcano-eruption-button" className="category-button" type="button" value="Volcano Eruption" onClick={e => handleAlertOptions(e.currentTarget.value)}>{/*<img className="cat-icon" src={require('../../../button-icons/002-volcano.png')} alt="volcano-eruption" />*/}</button>

          <button id="tsunami-button" className="category-button" type="button" value="Tsunami" onClick={e => handleAlertOptions(e.currentTarget.value)}>{/*<img className="cat-icon" src={require('../../../button-icons/003-tsunami.png')} alt="tsunami" />*/}</button>

          <button id="thief-button" className="category-button" type="button" value="Criminal Activity" onClick={e => handleAlertOptions(e.currentTarget.value)}>{/*<img className="cat-icon" src={require('../../../button-icons/thief.png')} alt="thief" />*/}</button>

          <button id="toxic-button" className="category-button" type="button" value="Toxic Waste" onClick={e => handleAlertOptions(e.currentTarget.value)}>{/*<img className="cat-icon" src={require('../../../button-icons/004-waste.png')} alt="toxic waste" />*/}</button>

          <button id="blizzard-button" className="category-button" type="button" value="Blizzard" onClick={e => handleAlertOptions(e.currentTarget.value)}>{/*<img className="cat-icon" src={require('../../../button-icons/blizzard.png')} alt="blizzard" />*/}</button>

        </div>
      </div>
    ) : (
      <p>
        Still grabbing your location... Please wait
      </p>
    );
};
export default AlertOptions;
