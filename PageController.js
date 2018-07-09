'use strict';

import React, { Component } from 'react';
import {
    FlatList,
    ViewPagerAndroid,
    View
} from 'react-native';

import PropTypes from 'prop-types';

import BaseComponent from '../BaseComponent';

import PageItemRefManager from './PageItemRefManager';

export default class PageController extends BaseComponent {

    selectIndex = 0;
    pageItems = [];
    loadPageItemIndexs = [];// 已经加载过的页面下标集合
    isDrag = true;

    static propTypes = {
        name: PropTypes.string.isRequired,
        pageStyle: PropTypes.any,
        pageData: PropTypes.array.isRequired,
        pageItemLoad: PropTypes.func,
        renderPageItem: PropTypes.func.isRequired,
        pageEndDrag: PropTypes.func,
    }

    static defaultProps = {
        pageData: [],
        pageStyle: { flex: 1 }
    }

    constructor(props) {
        super(props)
    }

    scrollToIndex(index) {
        if (index >= this.props.pageData.length) {
            console.warn('下标超出了限制');
            return;
        }
        let animated = true;
        // 如果选择的页面相邻超过一个，那就不执行切换动画
        if (Math.abs(index - this.selectIndex) > 1) {
            animated = false;
        }
        if (this.isIOS) {
            this.isDrag = false;
            this.flatList && this.flatList.scrollToIndex({ animated, index });
        } else {
            if (animated) {
                this.viewPager && this.viewPager.setPage(index);
            } else {
                this.viewPager && this.viewPager.setPageWithoutAnimation(index);
            }
        }
        this.selectIndex = index;
        if (this.loadPageItemIndexs.indexOf(index) == -1) {
            this.loadPageItemIndexs.push(index);
            let pageItemRef = PageItemRefManager.get(this.props.name, index);
            pageItemRef && pageItemRef.onVisibility();
        }
    }

    render() {
        if (this.isIOS) {
            return (<FlatList
                ref={ref => this.flatList = ref}
                style={this.props.pageStyle}
                keyExtractor={this._keyExtractor}
                data={this.props.pageData}
                horizontal={true}
                pagingEnabled={true}
                showsHorizontalScrollIndicator={false}
                onScrollBeginDrag={() => {
                    this.isDrag = true;
                }}
                onMomentumScrollEnd={(e) => {
                    if (this.isDrag) {
                        let index = e.nativeEvent.contentOffset.x / e.nativeEvent.layoutMeasurement.width;
                        this.props.pageEndScroll && this.props.pageEndScroll(index);
                    }
                }}
                renderItem={(item) => {
                    return this.props.renderPageItem(item.index);
                }}>
            </FlatList>)
        } else {
            return (<ViewPagerAndroid
                ref={ref => this.viewPager = ref}
                style={this.props.pageStyle}
                keyboardDismissMode="on-drag"
                onPageSelected={({ nativeEvent }) => {
                    let index = nativeEvent.position;
                    this.props.pageEndScroll && this.props.pageEndScroll(index);
                }}>
                {this.props.pageData.map((item, index) => {
                    return this.props.renderPageItem(index);
                })}
            </ViewPagerAndroid>);
        }
    }
}