
'use strict';

function debug(str) {
  dump(' -*- NetworkStatsGaia -*-: ' + str + '\n');
}
var i = 1;
const UI = (function() {

  navigator.mozSetMessageHandler('networkstats-alarm', function onAlarm(alarm){
    debug("================================");
    debug("--- " + JSON.stringify(alarm) + " ---");
    debug("================================");
  });

  var input1 = document.querySelector('#value1');
  var button1 = document.querySelector('#button1');
  var button2 = document.querySelector('#button2');
  var input2 = document.querySelector('#value2');
  var button3 = document.querySelector('#button3');

  button1.addEventListener('click', function(e) {

    debug("Call to setalarm");
    var date1 = new Date(new Date().getTime() - (60 * 1000));
    var date2 = new Date(new Date().getTime() + (60 * 1000));


var a =  window.navigator.mozNetworkStats.getAvailableNetworks();
a.onsuccess = function success() {
   debug("networks: " + JSON.stringify(a.result));
}



//    var request = window.navigator.mozNetworkStats.addAlarm({"type":0,"id":"0"}, input1.value);
    var request = window.navigator.mozNetworkStats.addAlarm({"type":1,"id":"8934071100275319410"}, input1.value);
//    var request = window.navigator.mozNetworkStats.addUsageAlarm("mobile", input1.value, {alarmEnd: date2});

    request.onsuccess = function success() {
      debug("Set alarm success: " + request.result);
    }

    request.onerror = function error() {
      debug("Set alarm error");
    }

  });


  button2.addEventListener('click', function(e) {

    debug("Call to getalarm");

//    var request = window.navigator.mozNetworkStats.getAllAlarms();
    var request = window.navigator.mozNetworkStats.getAllAlarms({"type":1,"id":"8934071100275319410"});

    request.onsuccess = function success() {
      debug("Get alarm success: " + JSON.stringify(request.result));
    }

    request.onerror = function error() {
      debug("Get alarm error: " + request.error.name);
    }

  });


  button3.addEventListener('click', function(e) {

    debug("Call to remove alarm");

    var request = window.navigator.mozNetworkStats.removeAlarms(input2.value);

    request.onsuccess = function success() {
      debug("Remove alarm success: " + request.result);
    }

    request.onerror = function error() {
      debug("Remove alarm error");
    }

  });

}());
