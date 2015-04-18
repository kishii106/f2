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
    render: function() {
        return (
            <div>
                {this.props.visible ?
                <div className="RoleSwitcher container">
                    <ul>
                        <li><a href="#"><span>食べたい物を選ぶ</span></a></li>
                        <li><a href="#"><span>作る物を決める</span></a></li>
                    </ul>
                </div>
                : null
                }
            </div>
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
    handleGlobalMenuClicked: function() {
        console.log(arguments);
    },
    render: function() {
        return (
            <div className="Page">
                <GlobalMenu onItemClicked={this.handleGlobalMenuClicked} />
                <TopBox onLoginSucceeed={this.handleLoginSucceeded} />
                <TransitionGroup transitionName="transition-fade">
                    <RoleSwitcher key={"roleswitcher_" + this.state.roleSwitcherVisible} visible={this.state.roleSwitcherVisible} />
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
