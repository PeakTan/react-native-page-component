'use strict';

import React, { Component } from 'react';
import {
    View,
} from 'react-native';

import PropTypes from 'prop-types';

import BaseComponent from '../BaseComponent';

import PageMenuView from './PageMenuView';

import PageController from './PageController';

import PageItemRefManager from './PageItemRefManager';

export default class PageComponent extends BaseComponent {

    static propTypes = {
        name: PropTypes.string.isRequired,// 唯一标识
        selectIndex: PropTypes.number,// 初始的选中下标
        style: PropTypes.any,// 样式
        menuStyle: PropTypes.any,// 菜单样式
        menuItemStyle: PropTypes.any,// 菜单选项样式
        menuTitleNormalStyle: PropTypes.any,// 菜单未选中的标题样式
        menuTitleSelectStyle: PropTypes.any,// 菜单选中的标题样式
        decorateStyle: PropTypes.any,// 菜单指示器的样式
        menuTitles: PropTypes.array.isRequired,// 菜单标题数据源
        menuScrollEnabled: PropTypes.bool,// 是否允许菜单滚动
        pageStyle: PropTypes.any,// 滚动页面的样式 
        renderPageItem: PropTypes.func.isRequired,// 渲染每个子页面
    }

    static defaultProps = {
        selectIndex: 0,
        menuScrollEnabled: true,
        menuTitles: [],
    }

    constructor(props) {
        super(props)
    }

    componentDidMount() {
        // 跳转到初始下标
        this.pageController && this.pageController.scrollToIndex(this.props.selectIndex);
    }

    componentWillUnmount() {
        // 组件销毁时清除所有ref引用数据
        PageItemRefManager.removeAll();
    }

    tapMenuItem(index) {
        this.pageController && this.pageController.scrollToIndex(index);
    }

    pageEndScroll(index) {
        this.pageMenu && this.pageMenu.selectToIndex(index);
    }

    render() {
        return (<View style={{ ...this.props.style }}>
            <PageMenuView
                ref={ref => this.pageMenu = ref}
                style={this.props.menuStyle}
                selectIndex={this.props.selectIndex}
                menuItemStyle={this.props.menuItemStyle}
                menuTitleNormalStyle={this.props.menuTitleNormalStyle}
                menuTitleSelectStyle={this.props.menuTitleSelectStyle}
                decorateStyle={this.props.decorateStyle}
                menuTitles={this.props.menuTitles}
                menuScrollEnabled={this.props.menuScrollEnabled}
                tapMenuItem={this.tapMenuItem.bind(this)}>
            </PageMenuView>
            <PageController
                name={this.props.name}
                ref={ref => this.pageController = ref}
                pageStyle={this.props.pageStyle}
                pageData={this.props.menuTitles}
                renderPageItem={this.props.renderPageItem}
                pageEndScroll={this.pageEndScroll.bind(this)}>
            </PageController>
        </View>);
    }
}