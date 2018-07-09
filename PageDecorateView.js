'use strict';

import React, { Component } from 'react';
import {
    Animated,
    Easing
} from 'react-native';

import BaseComponent from '../BaseComponent';

import PropTypes from 'prop-types';

export default class PageDecorateView extends BaseComponent {

    static propTypes = {
        decorateStyle: PropTypes.any,
        itemLayout: PropTypes.any,
    }

    constructor(props) {
        super(props)
        this.state = {
            itemWidthValue: new Animated.Value(0),
            itemLeftValue: new Animated.Value(0),
        };
    }

    componentWillReceiveProps(newProps) {
        let itemLayout = newProps.itemLayout;
        let itemWidth = itemLayout.width * 0.6;
        let itemLeft = itemLayout.x + (itemLayout.width - itemWidth) / 2;
        this.startAnimated(itemLeft, itemWidth);
    }

    startAnimated(itemLeft, itemWidth) {
        Animated.parallel([
            Animated.timing(this.state.itemLeftValue, {
                toValue: itemLeft,
                duration: 200,
                easing: Easing.linear
            }),
            Animated.timing(this.state.itemWidthValue, {
                toValue: itemWidth,
                duration: 200,
                easing: Easing.linear
            })
        ]).start();
    }

    render() {
        return (<Animated.View style={{
            position: 'absolute',
            bottom: 0,
            left: this.state.itemLeftValue,
            width: this.state.itemWidthValue,
            height: this._getSize(4),
            backgroundColor: '#1097D5',
            ...this.props.decorateStyle
        }}>
        </Animated.View>);
    }
}