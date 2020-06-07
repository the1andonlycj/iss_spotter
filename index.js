const { nextISSTimesForMyLocation } = require('./iss');

const printPassTimes = function(passTimes) {
  for (const pass of passTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
};

nextISSTimesForMyLocation((error, passTimes) => {
  if(error) {
  //Fail state:
    return console.log("Not this garbage again...", error);
  }
  //SUCCESS CONDITION
    printPassTimes(passTimes);
  });
              
  
                
         //PREVIOUS TESTING CODE:       
// const { fetchMyIP } = require('./iss');
// const { fetchCoordsByIP } = require('./iss');
// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work! " , error);
//     return;
//   }
//   console.log("It worked! Returned IP: " , ip)
// });


// fetchCoordsByIP ("72.141.28.19", (error, coords) => {
//   if(error) {
//     console.log("FML!" , error);
//   }
//   if(coords) {
//     console.log("It worked! Here are your coords: ", coords);
//   }
// });

// fetchISSFlyOverTimes({ latitude: '44.35720', longitude: '-79.69290' }, (error, flyOverTimes) => {
//   if(error) {
//     console.log("FML!" , error);
//   }
//   if(flyOverTimes) {
//     console.log("It worked! Here are your flyovers, you fly mf: ", flyOverTimes);
//   }
// });
// const { fetchISSFlyOverTimes } = require('./iss');