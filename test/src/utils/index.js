import evtBus from "./event";
import ajax from "./ajax";
window.Event = evtBus;
window.$http = ajax;