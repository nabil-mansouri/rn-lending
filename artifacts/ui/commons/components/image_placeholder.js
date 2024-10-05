import React from 'react';
import { ImageBackground } from 'react-native';
export class ImagePlaceHolder extends React.Component {
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
        };
        const renderChild = () => {
            if (isFinishSuccess()) {
                return null;
            }
            else {
                return placeholder();
            }
        };
        if (source && source.uri) {
            return (React.createElement(ImageBackground, { style: imgStyle, borderRadius: borderRadius, onLoadEnd: this.onLoadEnd.bind(this), onError: this.onError.bind(this), source: source }, renderChild()));
        }
        else {
            return placeholder();
        }
    }
}
//# sourceMappingURL=image_placeholder.js.map