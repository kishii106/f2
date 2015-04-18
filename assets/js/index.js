(function() {
"use strict";

var TransitionGroup = React.addons.CSSTransitionGroup;

var TopBox = React.createClass({displayName: "TopBox",
    getInitialState: function() {
        return {
            visible: true,
        };
    },
    handleLoginSucceeded: function() {
        this.setState({ visible: false });
        this.props.onLoginSucceeed();
    },
    render: function() {
        return (
            React.createElement(TransitionGroup, {transitionName: "transition-fade"}, 
                this.state.visible ?
                React.createElement("div", {key: "top-box_" + this.state.visible, className: "TopBox"}, 
                    React.createElement("div", {className: "catch-copy"}, 
                        React.createElement("h2", null, "今日、なに食べる？"), 
                        React.createElement("p", null, "ふ〜どふぁいんだ〜がメニューを提案します。"), 
                        React.createElement("p", null, "今日もあなたの食事が楽しくなりますように。")
                    ), 
                    React.createElement(LoginBox, {onLoginSucceeed: this.handleLoginSucceeded})
                )
                : null
                
            )
        )
    }
});

var RoleSwitcher = React.createClass({displayName: "RoleSwitcher",
    render: function() {
        return (
            React.createElement("div", null, 
                this.props.visible ?
                React.createElement("div", {className: "RoleSwitcher container"}, 
                    React.createElement("ul", null, 
                        React.createElement("li", null, React.createElement("a", {href: "#"}, React.createElement("span", null, "食べたい物を選ぶ"))), 
                        React.createElement("li", null, React.createElement("a", {href: "#"}, React.createElement("span", null, "作る物を決める")))
                    )
                )
                : null
                
            )
        )
    }
});

var Page = React.createClass({displayName: "Page",
    getInitialState: function() {
        return {
            roleSwitcherVisible: false,
        };
    },
    handleLoginSucceeded: function() {
        this.setState({ roleSwitcherVisible: true });
    },
    handleGlobalMenuClicked: function() {
        console.log(arguments);
    },
    render: function() {
        return (
            React.createElement("div", {className: "Page"}, 
                React.createElement(GlobalMenu, {onItemClicked: this.handleGlobalMenuClicked}), 
                React.createElement(TopBox, {onLoginSucceeed: this.handleLoginSucceeded}), 
                React.createElement(TransitionGroup, {transitionName: "transition-fade"}, 
                    React.createElement(RoleSwitcher, {key: "roleswitcher_" + this.state.roleSwitcherVisible, visible: this.state.roleSwitcherVisible})
                ), 
                React.createElement("div", {className: "container"}, 
                    React.createElement("div", null, 
                        React.createElement("h2", null, "おとなりメニュー"), 
                        React.createElement(Neighbor, {visible: true})
                    ), 
                    React.createElement("div", null, 
                        React.createElement("h2", null, "ジャンル別"), 
                        React.createElement(Genre, {visible: true})
                    )
                )
            )
        )
    }
});

React.render(
    React.createElement(Page, null),
    document.getElementById('page')
);

})();
