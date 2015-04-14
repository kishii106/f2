(function($) {
"use strict";

var TransitionGroup = React.addons.CSSTransitionGroup;

var TopBox = React.createClass({
    render: function() {
        var classes = React.addons.classSet({'TopBox': true});
        return (
            <div className="TopBox">
                <div className="catch-copy">
                    <h2>今日、なに食べる？</h2>
                    <p>ふ〜どふぁいんだ〜がメニューを提案します。</p>
                    <p>今日もあなたの食事が楽しくなりますように。</p>
                </div>
                <LoginBox />
            </div>
        )
    }
});

var Page = React.createClass({
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
            <div>
                <GlobalMenu onItemClicked={this.handleGlobalMenuItemClicked} />
                <TransitionGroup transitionName="top-box">
                    {this.state.topBoxVisible ? <TopBox /> : null}
                </TransitionGroup>
                <GuestMenu onActiveChange={this.handleGuestMenuActiveChange} />
            </div>
        )
    }
});

React.render(
    <Page />,
    document.getElementById('page')
);
})(jQuery);
