'use strict';

import React, { Component } from 'react';
import {
    Animated,
    ScrollView,
    View,
    TouchableOpacity,
    Text
} from 'react-native';

import PropTypes from 'prop-types';

import BaseComponent from '../BaseComponent';

import CallOnceIninterval from '../../utils/CallOnceIninterval';

import PageDecorateView from './PageDecorateView';

export default class PageMenuView extends BaseComponent {

    scrollViewWidth = 0;
    scrollViewHeight = 0;
    contentWidth = 0;
    itemLayouts = [];

    static propTypes = {
        style: PropTypes.any,
        menuItemStyle: PropTypes.any,
        menuTitleNormalStyle: PropTypes.any,
        menuTitleSelectStyle: PropTypes.any,
        decorateStyle: PropTypes.any,
        menuScrollEnabled: PropTypes.bool,
        menuTitles: PropTypes.array,
        selectIndex: PropTypes.number,
        tapMenuItem: PropTypes.func.isRequired,
    }

    static defaultProps = {
        menuScrollEnabled: true,
        menuTitles: [],
        selectIndex: 0,
    }

    constructor(props) {
        super(props)
        this.state = {
            selItemLayout: null,
            selectIndex: this.props.selectIndex,
        }
    }

    selectToIndex(index) {
        if (index == this.state.selectIndex) {
            return;
        }
        CallOnceIninterval(() => {
            this.setState({
                selectIndex: index,
                selItemLayout: this.itemLayouts[index]
            }, () => {
                this.refreshContentOffsetItem();
            });
        }, 200)
    }

    // 将选中item移动到中间位置
    refreshContentOffsetItem() {
        let layout = this.state.selItemLayout;
        let itemX = layout.x;
        let itemWidth = layout.width;
        let width = this.scrollViewWidth;
        let contentWidth = this.contentWidth;

        if (itemX > width / 2) {
            let targetX = 0;
            if ((contentWidth - itemX) <= width / 2) {
                targetX = contentWidth - width;
            } else {
                targetX = itemX - width / 2 + itemWidth / 2;
            }
            if (targetX + width > contentWidth) {
                targetX = contentWidth - width;
            }
            this.scrollView && this.scrollView.scrollTo({ x: targetX, y: 0, animated: true });
        } else {
            this.scrollView && this.scrollView.scrollTo({ x: 0, y: 0, animated: true });
        }

        this.props.tapMenuItem(this.state.selectIndex);
    }

    render() {
        let itemLayouts = [];
        return (<View style={{ ...this.props.style }}>
            <ScrollView
                onLayout={(e) => {
                    this.scrollViewWidth = e.nativeEvent.layout.width;
                    this.scrollViewHeight = e.nativeEvent.layout.height;
                }}
                ref={ref => this.scrollView = ref}
                style={this.props.style}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                scrollEnabled={this.props.menuScrollEnabled}>
                <PageDecorateView
                    decorateStyle={this.props.decorateStyle}
                    itemLayout={this.state.selItemLayout}>
                </PageDecorateView>
                {this.props.menuTitles.map((item, index) => {
                    return (<TouchableOpacity
                        key={index.toString()}
                        onLayout={(e) => {
                            itemLayouts.push({ target: e.nativeEvent.target, width: e.nativeEvent.layout.width, height: e.nativeEvent.layout.height });
                            if (itemLayouts.length == this.props.menuTitles.length) {
                                itemLayouts.sort((x, y) => {
                                    if (x.target < y.target) {
                                        return -1;
                                    }
                                    return 1;
                                });
                                let itemX = 0, layouts = [];
                                itemLayouts.map((item, index) => {
                                    layouts.push({ x: itemX, y: 0, width: item.width, height: item.height });
                                    itemX = item.width + itemX;
                                });
                                this.contentWidth = itemX;
                                this.itemLayouts = layouts;
                                this.setState({ selItemLayout: this.itemLayouts[this.state.selectIndex] });
                            }
                        }}
                        style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            ...this.props.menuItemStyle
                        }}
                        onPress={() => {
                            this.selectToIndex(index);
                        }}>
                        <Text style={index == this.state.selectIndex ? this.props.menuTitleSelectStyle : this.props.menuTitleNormalStyle}>{item}</Text>
                    </TouchableOpacity>);
                })}
            </ScrollView>
        </View>);
    }
}