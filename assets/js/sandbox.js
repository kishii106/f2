(function() {
"use strinct";

var TransitionGroup = React.addons.CSSTransitionGroup;

var GlobalMenu = React.createClass({displayName: "GlobalMenu",
    getInitialState: function() {
        return {
            listVisible: false,
            data: [
                { text: "設定", icon: "cog" },
                { text: "ログアウト", icon: "log-out" },
            ],
        };
    },
    onClick: function() {
        this.setState({ listVisible: !this.state.listVisible });
    },
    render: function() {
        var items = this.state.data.map(function(data) {
            return (
                React.createElement("li", {className: "menu-item"}, 
                    React.createElement("i", {className: "glyphicon glyphicon-" + data.icon}), 
                    React.createElement("span", {className: "menu-text"}, data.text)
                )
            )
        });
        return (
            React.createElement("div", {className: "GlobalMenu"}, 
                React.createElement("a", {className: "menu-button btn btn-default", onClick: this.onClick}, 
                    React.createElement("i", {className: "glyphicon glyphicon-list"})
                ), 
                React.createElement(TransitionGroup, {transitionName: "menu-list"}, 
                this.state.listVisible ?
                    React.createElement("ul", {key: "menu-list", className: "menu-list"}, 
                        items
                    ) : null
                
                )
            )
        )
    }
});

var Page = React.createClass({displayName: "Page",
    render: function() {
        return (
            React.createElement("div", {className: "Page"}, 
                React.createElement(GlobalMenu, null)
            )
        )
    }
});

React.render(
    React.createElement(Page, null),
    document.getElementById('page')
);

})();
