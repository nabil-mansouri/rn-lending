require('es6-symbol/implement');
import React from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import { store } from './ui/store';
import { Stack } from './ui/views';
import { install } from "./install";
import SplashScreen from 'react-native-splash-screen';
class App extends React.Component {
    componentDidMount() {
        install();
        SplashScreen.hide();
    }
    render() {
        return (React.createElement(Provider, { store: store },
            React.createElement(Stack, null)));
    }
}
AppRegistry.registerComponent('pretemprunt', () => App);
//# sourceMappingURL=index.js.map