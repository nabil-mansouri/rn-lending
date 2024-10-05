import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
export function factoryIcon(clazz, name) {
    let temp = clazz["navigationOptions"] || {};
    temp.tabBarIcon = (opt) => React.createElement(TabIcon, Object.assign({ name: name }, opt));
    clazz["navigationOptions"] = temp;
}
class IconProps {
}
export class TabIcon extends React.Component {
    render() {
        return React.createElement(Icon, { size: 24, name: this.props.name, color: this.props.tintColor });
    }
}
//# sourceMappingURL=tabs_icon.js.map