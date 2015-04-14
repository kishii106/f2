(function() {
"use strict";

var TransitionGroup = React.addons.CSSTransitionGroup;

window.GlobalMenu = React.createClass({displayName: "GlobalMenu",
    getInitialState: function() {
        return {
            listVisible: false,
            data: [
                { description: "genre", text: "ジャンル別", icon: "tags" },
                { description: "neighbor", text: "おとなり", icon: "home" },
                { description: "settings", text: "設定", icon: "cog" },
                { description: "login", text: "ログイン", icon: "log-in" },
            ],
        };
    },
    switchListVisible: function() {
        this.setState({ listVisible: !this.state.listVisible });
    },
    handleClick: function(e) {
        this.props.onItemClicked(e);
        this.setState({ listVisible: false });
    },
    render: function() {
        var self = this;
        var items = this.state.data.map(function(data) {
            return (
                React.createElement("li", {key: "global-menu-item_" + data.description, className: "global-menu-item"}, 
                    React.createElement("a", {href: "#", onClick: self.handleClick.bind(self, { data: data })}, 
                        React.createElement("i", {className: "glyphicon glyphicon-" + data.icon}), 
                        React.createElement("span", {className: "global-menu-text"}, data.text)
                    )
                )
            )
        });
        return (
            React.createElement("div", {className: "GlobalMenu"}, 
                React.createElement("a", {className: "global-menu-button btn btn-default", onClick: this.switchListVisible}, 
                    React.createElement("i", {className: "glyphicon glyphicon-list"})
                ), 
                React.createElement(TransitionGroup, {transitionName: "global-menu-list"}, 
                this.state.listVisible ?
                    React.createElement("ul", {key: "global-menu-list", className: "global-menu-list"}, 
                        items
                    ) : null, 
                
                this.state.listVisible ?
                    React.createElement("div", {className: "screen-shutter", onClick: this.switchListVisible}
                    ) : null
                
                )
            )
        )
    }
});

})();
