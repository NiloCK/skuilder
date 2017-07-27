import RX = require('reactxp');
import App = require('./App');
import Recorder from 'skldr-db'

Recorder.init();

RX.App.initialize(true, true);
RX.UserInterface.setMainView(<App />);
