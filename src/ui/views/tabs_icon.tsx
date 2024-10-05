import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons' 


interface TabIconParams {
    tintColor: (string | null);
    focused: boolean;
}
export function factoryIcon(clazz, name: string) {
    let temp: any = clazz["navigationOptions"] || {};
    temp.tabBarIcon = (opt: TabIconParams) => <TabIcon name={name} {...opt} />;
    clazz["navigationOptions"] = temp;
}
class IconProps {
    tintColor: (string | null);
    focused: boolean;
    name: string;
}
export class TabIcon extends React.Component<IconProps>{
    render() {
        return <Icon size={24} name={this.props.name} color={this.props.tintColor} />;
    }
}