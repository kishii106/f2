(function() {
"use strict";

var TransitionGroup = React.addons.CSSTransitionGroup;

var TopBox = React.createClass({
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
        var classes = React.addons.classSet({
            "TopBox": true,
            "hidden": !this.state.visible,
        });
        return (
            <TransitionGroup transitionName="fade-out">
                <div key={"top-box_" + this.state.visible} className={classes}>
                    <div className="catch-copy">
                        <h2>今日、なに食べる？</h2>
                        <p>ふ〜どふぁいんだ〜がメニューを提案します。</p>
                        <p>今日もあなたの食事が楽しくなりますように。</p>
                    </div>
                    <LoginBox onLoginSucceeed={this.handleLoginSucceeded} />
                </div>
            </TransitionGroup>
        )
    }
});

var RoleSwitcher = React.createClass({
    render: function() {
        var classes = React.addons.classSet({
            "RoleSwitcher": true,
            "hidden": !this.props.visible,
            "container": true,
        });
        return (
            <TransitionGroup transitionName="fade-in">
            {this.props.visible ?
                <div key={"RoleSwitcher_" + this.props.visible} className={classes}>
                    <ul>
                        <li><a href="#"><span>食べたい物を選ぶ</span></a></li>
                        <li><a href="#"><span>作る物を決める</span></a></li>
                    </ul>
                </div> : null
            }
            </TransitionGroup>
        )
    }
});

var Page = React.createClass({
    getInitialState: function() {
        return {
            roleSwitcherVisible: false,
        };
    },
    handleLoginSucceeded: function() {
        this.setState({ roleSwitcherVisible: true });
    },
    render: function() {
        return (
            <div className="Page">
                <TopBox onLoginSucceeed={this.handleLoginSucceeded} />
                <TransitionGroup transitionName="fade-in">
                    <RoleSwitcher visible={this.state.roleSwitcherVisible} />
                </TransitionGroup>
                <div className="container">
                    <div>
                        <h2>おとなりメニュー</h2>
                        <Neighbor visible={true} />
                    </div>
                    <div>
                        <h2>ジャンル別</h2>
                        <Genre visible={true} />
                    </div>
                </div>
            </div>
        )
    }
});

React.render(
    <Page />,
    document.getElementById('page')
);
})();
