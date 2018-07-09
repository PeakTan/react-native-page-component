'use strict';

import React, { Component } from 'react';
import {
    View,
} from 'react-native';

import PropTypes from 'prop-types';

import BaseComponent from '../BaseComponent';

import PageDecorateView from './PageDecorateView';

import PageItemRefManager from './PageItemRefManager';

export default class PageItem extends BaseComponent {

    static propTypes = {
        style: PropTypes.any,
        host: PropTypes.string.isRequired,
        index: PropTypes.number.isRequired,
        onVisibilityLoad: PropTypes.func
    }

    constructor(props) {
        super(props)
    }

    componentDidMount() {
        PageItemRefManager.add(this.props.host, this.props.index, this);
    }

    onVisibility() {
        this.props.onVisibilityLoad && this.props.onVisibilityLoad();
    }

    render() {
        return this.props.children;
    }
}