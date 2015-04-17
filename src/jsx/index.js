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
        return (
            <TransitionGroup transitionName="transition-fade">
                {this.state.visible ?
                <div key={"top-box_" + this.state.visible} className="TopBox">
                    <div className="catch-copy">
                        <h2>今日、なに食べる？</h2>
                        <p>ふ〜どふぁいんだ〜がメニューを提案します。</p>
                        <p>今日もあなたの食事が楽しくなりますように。</p>
                    </div>
                    <LoginBox onLoginSucceeed={this.handleLoginSucceeded} />
                </div>
                : null
                }
            </TransitionGroup>
        )
    }
});

var RoleSwitcher = React.createClass({
    getInitialState: function() {
        return {
            visible: this.props.visible
        };
    },
    onClick: function() {
        console.log(arguments);
        this.setState({ visible: !this.state.visible });
    },
    render: function() {
        return (
            <TransitionGroup transitionName="transition-fade">
                {this.state.visible ?
                <div key={"RoleSwitcher_" + this.state.visible} className="RoleSwitcher container">
                    <ul>
                        <li><a href="#"><span>食べたい物を選ぶ</span></a></li>
                        <li><a href="#"><span>作る物を決める</span></a></li>
                    </ul>
                    <button onClick={this.onClick}>hoge</button>
                </div>
                : null
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
                <RoleSwitcher key={"roleswitcher_" + this.state.roleSwitcherVisible} visible={this.state.roleSwitcherVisible} />
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
