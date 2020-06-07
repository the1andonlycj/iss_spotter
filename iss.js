const request = require("request"); 

const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP((error, ip) => {
    if (error) {
      return callback(error, null);
    }

    fetchCoordsByIP(ip, (error, loc) => {
      if (error) {
        return callback(error, null);
      }

      fetchISSFlyOverTimes(loc, (error, nextPasses) => {
        if (error) {
          return callback(error, null);
        }
        callback(null, nextPasses);
      });
    });
  });
};

const fetchISSFlyOverTimes = function(coords, callback) {
  request(`http://api.open-notify.org/iss-pass.json?lat=${coords.latitude}&lon=${coords.longitude}`, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching coordinates for IP. Response: ${body}`;
      callback (Error(msg), null);
      return;
    } 
    callback(null, JSON.parse(body).response);
  }); 
};


const fetchCoordsByIP = function(ip, callback) {
  request(`https://ipvigilante.com/json/${ip}`, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching ISS pass times. Response: ${body}`;
      callback (Error(msg), null);
      return;
    } 
    //THIS IS THE ONLY PART WE CHANGED TO MATCH THEIRS, SO IF IT SUCKS, LOOK HERE.
    const passes = JSON.parse(body).data;
    callback(null, passes);
  });
};



const fetchMyIP = function(callback) {
  request ("https://api.ipify.org?format=json" , (error, response, body) => {
  if (error) {
    callback(error, null);
  }
  if (response.statusCode !== 200) {
    const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
    callback(Error(msg), null);
    return;
  }
  let data = JSON.parse(body).ip; 
  if (data) {
    callback(null, data);
  }
  });
}







module.exports = { nextISSTimesForMyLocation };
// module.exports = { fetchISSFlyOverTimes };
// module.exports = { fetchMyIP };
// module.exports = { fetchCoordsByIP }