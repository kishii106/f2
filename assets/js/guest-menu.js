(function() {
"use strict";

var TransitionGroup = React.addons.CSSTransitionGroup;

window.GuestMenu = React.createClass({displayName: "GuestMenu",
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
                React.createElement(MenuItem, {key: data.itemName, itemName: data.itemName, iconName: data.iconName, itemText: data.itemText, onClick: self.handleItemClick})
            )
        });
        return (
            React.createElement("div", {id: "guest-menu"}, 
                React.createElement(TransitionGroup, {transitionName: "top-box"}, 
                    !this.state.active ? React.createElement("h2", {className: "title-single"}, "一人で使う") : null
                ), 
                React.createElement("div", {className: "menu-items"}, 
                    items
                ), 
                this.state.active ?
                    React.createElement("div", {className: "contents"}, 
                        React.createElement(WordSearch, {visible: this.state.activeMenuName === "word-search"}), 
                        React.createElement(Genre, {visible: this.state.activeMenuName === "genre"}), 
                        React.createElement(Neighbor, {visible: this.state.activeMenuName === "neighbor"}), 
                        React.createElement(MenuRegistration, {visible: this.state.activeMenuName === "menu-registration"})
                    ) : null
                
            )
        )
    }
});

})();
