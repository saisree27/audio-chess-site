from channels.routing import route
from channels.routing import ProtocolTypeRouter
from consumers import ws_connect, ws_disconnect


channel_routing = [
    route('websocket.connect', ws_connect),
    route('websocket.disconnect', ws_disconnect),
]

application = ProtocolTypeRouter({
    # Empty for now (http->django views is added by default)
})