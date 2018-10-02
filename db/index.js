const Sequelize = require('sequelize');
const moment = require('moment');
require('dotenv').config();

console.log(process.env.DB_URL);
const sequelize = new Sequelize(`${process.env.DB_URL}`);

sequelize.authenticate()
  .then(() => {
    console.log('DB successfully established');
  });


const User = sequelize.define('User', {
  name: { type: Sequelize.STRING },
});

const Event = sequelize.define('Event', {
  latitude: { type: Sequelize.DECIMAL(25, 20) },
  longitude: { type: Sequelize.DECIMAL(25, 20) },
  category: { type: Sequelize.STRING },

});


const Alert = sequelize.define('Alert', {
  latitude: { type: Sequelize.DECIMAL(25, 20) },
  longitude: { type: Sequelize.DECIMAL(25, 20) },
  // events_category: { type: Sequelize.STRING },
  // event_id: { type: Sequelize.NUMBER },
  // user_id: { type: Sequelize.NUMBER }
});

const Media = sequelize.define('Media', {
  url: { type: Sequelize.STRING },
  photoTag: { type: Sequelize.STRING },
  // alert_id: { type: Sequelize.INTEGER }
});

Event.hasMany(Alert, { as: 'Alerts' });
Alert.belongsTo(Event);
Alert.hasMany(Media, { as: 'Media' });
Media.belongsTo(Alert);
// Alert.hasOne(User); 
User.hasMany(Alert, { as: 'Alerts' });

sequelize.sync();

const distance = (lat1, lon1, lat2, lon2) => {
  const radlat1 = Math.PI * lat1 / 180;
  const radlat2 = Math.PI * lat2 / 180;
  const theta = lon1 - lon2;
  const radtheta = Math.PI * theta / 180;
  let dist = Math.sin(radlat1) * Math.sin(radlat2)
           + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
  if (dist > 1) {
    dist = 1;
  }
  dist = Math.acos(dist);
  dist = dist * 180 / Math.PI;
  dist = dist * 60 * 1.1515;
  return dist;
};

const checkEvents = (category, latitude, longitude, timeStamp) => {
  const addEvent = () => Event.create({ category, latitude, longitude });

  return (
    Event.findAll({ where: { category } })
      .then((results) => {
        console.log('checking category...');
        if (results.length > 0) {
          for (let i = 0; i < results.length; i += 1) {
            const event = results[i].dataValues;
            console.log('checking time difference & distance...');
            if (moment(timeStamp).subtract(24, 'hours') < moment(event.updatedAt) // event within 24 hrs
            && distance(event.latitude, event.longitude, latitude, longitude) < 10) { // coordinate distance < 10 mi
              console.log('Event within time frame and radius already exists!');
              return event;
            }
          }
        }
        console.log('adding new event!');
        return (addEvent()
          .then(result => result.dataValues));
      })
  );
};

const createAlert = (EventID, timeStamp, latitude, longitude, notes, photo, photoTag) => {
  // Event.findById(EventID)
  //   .then((event) => {
  //     event.setAlerts({
  //       latitude, longitude, notes,
  //     });
  //   })
  //   .then((result) => { console.log('result from setAlerts: ', result); });
  Alert.create({
    EventID, latitude, longitude, notes,
  }).then((alert) => {
    alert.setMedia({
      url: photo, photoTag,
    });
  }).then((result, err) => {
    if (result) {
      console.log('after setMedia invoked', result);
    } else {
      console.log(err);
    }
  });
};
// const addUser = (user) => {
//     console.log('creating user');
//     Users.upsert({ user })
//         .then(()=> {
//         console.log('entered user!')
//         })
//         .catch(() => {
//             console.log('could not enter user');
//         })
// }

exports.Event = Event;
exports.User = User;
exports.Alert = Alert;
exports.Media = Media;
exports.checkEvents = checkEvents;
exports.createAlert = createAlert;
// exports.addUser = addUser;
