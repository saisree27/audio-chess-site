var ws_url = "https://api.us-south.speech-to-text.watson.cloud.ibm.com/instances/1be94588-c125-4a3c-b119-4e202d2b1d50"

var IAM_access_token = "UOyzmj4IIjNnT2JIddHVX1viMNLRxSRPAkkn9K2238pq";
var wsURI = ws_url + '/v1/recognize'
  + '?access_token=' + IAM_access_token
  + '&model=es-ES_BroadbandModel';
var websocket = new WebSocket(wsURI);

websocket.onopen = function(evt) { onOpen(evt) };
websocket.onclose = function(evt) { onClose(evt) };
websocket.onmessage = function(evt) { onMessage(evt) };
websocket.onerror = function(evt) { onError(evt) };

function onOpen(evt) {
    var message = {
      action: 'start',
    };
    websocket.send(JSON.stringify(message));
  }

  