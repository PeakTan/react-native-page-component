## react-native-page-component
react native 分页组件
## Installation

Using npm:

```shell
npm install --save react-native-page-component
```

or using yarn:

```shell
yarn add react-native-page-component
```
## Usage
```javascript
<PageComponent
            name="FriendsHelper"
            style={{ flex: 1, width: this.mScreenWidth }}
            selectIndex={0}
            menuStyle={{ height: this._getSize(46), borderBottomColor: '#E8EEF0', borderBottomWidth: this.mOnePixel }}
            menuItemStyle={{ paddingLeft: this._getSize(20), paddingRight: this._getSize(20), }}
            menuTitleNormalStyle={{ fontSize: this._getSize(16), color: '#979797' }}
            menuTitleSelectStyle={{ fontSize: this._getSize(16), color: this.mHeaderColor, fontWeight: '600' }}
            menuScrollEnabled={true}
            menuTitles={this.state.cateNames}
            pageStyle={{
                backgroundColor: '#F5F5F5', width: this.mScreenWidth, height: this.mScreenHeight - this.mHeaderHeight - this.mStatusBarHeight - this._getSize(46),
            }}
            decorateStyle={{ backgroundColor: this.mHeaderColor, height: this._getSize(3) }}
            renderPageItem={(index) => {
                let pageItemComponent;
                return <PageItem host="FriendsHelper" index={index} onVisibilityLoad={() => {
                    pageItemComponent.fetchResult();
                }}>
                    <PageItemComponent pageRef={this} cateId={this.state.cateIds[index]} ref={ref => pageItemComponent = ref}>                                 </PageItemComponent>
                </PageItem>
            }}>
</PageComponent>
```
