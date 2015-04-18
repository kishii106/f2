(function($) {
"use strict";

var TransitionGroup = React.addons.CSSTransitionGroup;

var TopBox = React.createClass({displayName: "TopBox",
    render: function() {
        var classes = React.addons.classSet({'TopBox': true});
        return (
            React.createElement("div", {className: "TopBox"}, 
                React.createElement("div", {className: "catch-copy"}, 
                    React.createElement("h2", null, "今日、なに食べる？"), 
                    React.createElement("p", null, "ふ〜どふぁいんだ〜がメニューを提案します。"), 
                    React.createElement("p", null, "今日もあなたの食事が楽しくなりますように。")
                ), 
                React.createElement(LoginBox, null)
            )
        )
    }
});

var Page = React.createClass({displayName: "Page",
    getInitialState: function() {
        return { topBoxVisible: true };
    },
    handleGuestMenuActiveChange: function(e) {
        this.setState({ topBoxVisible: !e.active });
    },
    handleGlobalMenuItemClicked: function(e) {
        if (e.data.description === "login") {
            this.setState({ topBoxVisible: true });
        }
    },
    render: function() {
        return (
            React.createElement("div", null, 
                React.createElement(GlobalMenu, {onItemClicked: this.handleGlobalMenuItemClicked}), 
                React.createElement(TransitionGroup, {transitionName: "top-box"}, 
                    this.state.topBoxVisible ? React.createElement(TopBox, null) : null
                ), 
                React.createElement(GuestMenu, {onActiveChange: this.handleGuestMenuActiveChange})
            )
        )
    }
});

React.render(
    React.createElement(Page, null),
    document.getElementById('page')
);
})(jQuery);
