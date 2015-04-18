(function() {
"use strict";

var TransitionGroup = React.addons.CSSTransitionGroup;

window.GuestMenu = React.createClass({
    getInitialState: function() {
        return {
            active: false,
            data: [
                { itemName: "word-search", iconName: "search", itemText: "ワード検索" },
                { itemName: "genre", iconName: "tags", itemText: "ジャンル別" },
                { itemName: "neighbor", iconName: "home", itemText: "おとなり" },
                { itemName: "menu-registration", iconName: "plus", itemText: "メニュー追加" },
            ]
        };
    },
    handleItemClick: function(e) {
        this.props.onActiveChange({ active: true });
        this.setState({
            active: true,
            activeMenuName: e.itemName,
        });
    },
    render: function() {
        var self = this;
        var items = this.state.data.map(function(data) {
            return (
                <MenuItem key={data.itemName} itemName={data.itemName} iconName={data.iconName} itemText={data.itemText} onClick={self.handleItemClick} />
            )
        });
        return (
            <div id="guest-menu">
                <TransitionGroup transitionName="top-box">
                    {!this.state.active ? <h2 className="title-single">一人で使う</h2> : null}
                </TransitionGroup>
                <div className="menu-items">
                    {items}
                </div>
                {this.state.active ?
                    <div className="contents">
                        <WordSearch visible={this.state.activeMenuName === "word-search"} />
                        <Genre visible={this.state.activeMenuName === "genre"} />
                        <Neighbor visible={this.state.activeMenuName === "neighbor"} />
                        <MenuRegistration visible={this.state.activeMenuName === "menu-registration"} />
                    </div> : null
                }
            </div>
        )
    }
});

})();
