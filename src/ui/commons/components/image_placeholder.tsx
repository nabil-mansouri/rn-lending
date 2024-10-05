import React from 'react';
import { StyleProp, ImageStyle, ImageBackground } from 'react-native';
interface State {
    isLoaded: boolean,
    isError: boolean;
}
export interface Props {
    placeholder: () => React.ReactElement<any>;
    source: { uri: string, width?: number, height?: number }
    imgStyle: StyleProp<ImageStyle>;
    borderRadius: number
}
export class ImagePlaceHolder extends React.Component<Props, State> {

    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            isError: false
        };
    }

    onLoadEnd() {
        this.setState({
            isLoaded: true
        });
    }

    onError() {
        this.setState({
            isError: true
        });
    }

    render() {
        const { source, placeholder, imgStyle, borderRadius } = this.props;
        const isFinishSuccess = () => {
            return this.state.isLoaded && !this.state.isError;
        }
        const renderChild = () => {
            if (isFinishSuccess()) {
                return null;
            } else {
                return placeholder();
            }
        }
        if (source && source.uri) {
            return (
                <ImageBackground
                    style={imgStyle} borderRadius={borderRadius}
                    onLoadEnd={this.onLoadEnd.bind(this)}
                    onError={this.onError.bind(this)}
                    source={source}
                >
                    {renderChild()}
                </ImageBackground>
            );
        } else {
            return placeholder()
        }
    }
}