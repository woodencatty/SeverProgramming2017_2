var hotspot = require('node-hotspot');

var opts = {
   ssid: 'APD', 
   password: '1q2w3e4r', 
   force: true, // (optional)  if hosting a network already turn it off and run ours. 
   adaptor: 'Ethernet' // (optional / false) name of adaptor to have ICS (Internet Connection Sharing) share internet from, passing false disables ICS all together - if non givin node-hotspot will attempt to find currently connected adaptor automatically 
};

hotspot.enable(opts)
   .then(function() {
       console.log('Hotspot Enabled')
   })
   .catch(function(e) {
       Console.log('Something went wrong; Perms?', e)
   });

   process.on('SIGINT', () => {
hotspot.disable(opts)
.then(function() {
    console.log('Hotspot disabled')
})
.catch(function(e) {
    Console.log('Something went wrong; Perms?', e)
});
setTimeout(()=>{
    process.exit(1);
}, 1000)
  });

  setInterval(()=>{
console.log('continue');
 
  }, 1000);