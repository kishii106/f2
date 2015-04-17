(function() {
"use strict";

var TransitionGroup = React.addons.CSSTransitionGroup;

window.LoginBox = React.createClass({
    getInitialState: function() {
        return {
            autoLogin: true,
            visible: true,
            loginButton: null,
            loginIndicatorActive: false,
            messageVisible: false,
            messageText: "",
        };
    },
    componentDidMount: function() {
        $('#login-box .family').focus();
        this.setState({ loginButton: React.findDOMNode(this.refs.loginButton) });
    },
    handleLogin: function(e) {
        this.setState({ loginIndicatorActive: true });
        var familyName = React.findDOMNode(this.refs.familyName).value;
        var password = React.findDOMNode(this.refs.password).value;
        $.ajax({
            url: '/login/try',
            type: 'post',
            data: { familyName: familyName, password: password },
            success: function(result) {
                if (result.success) {
                    this.props.onLoginSucceeed();
                } else {
                    this.setState({ messageVisible: true, messageText: "ログインに失敗しました。" });
                }
            }.bind(this),
            fail: function() {
                console.log(arguments);
            },
            complete: function() {
                this.setState({ loginIndicatorActive: false });
            }.bind(this),
        });
    },
    handleSignIn: function(e) {
        alert('サインイン処理：未実装...');
        e.preventDefault();
    },
    handleAutoLoginChange: function() {
        this.setState({ autoLogin: !this.state.autoLogin });
    },
    handleMessageCloseClick: function() {
        this.setState({ messageVisible: false });
    },
    render: function() {
        return (
            <div className="LoginBox">
                <TransitionGroup transitionName="transition-fade">
                    <Message key={"message_" + this.state.messageVisible} onCloseClick={this.handleMessageCloseClick} visible={this.state.messageVisible} text={this.state.messageText} />
                </TransitionGroup>
                <fieldset>
                    <legend>家族と使う</legend>
                    <div className="form-group">
                        <input type="text" ref="familyName" className="form-control family" placeholder="ファミリー" />
                    </div>
                    <div className="form-group">
                        <input type="password" ref="password" className="form-control password" placeholder="合言葉" />
                    </div>
                    <div className="checkbox">
                        <label>
                            <input type="checkbox" name="autoLogin" checked={this.state.autoLogin} onChange={this.handleAutoLoginChange} />
                            ログインしたままにする
                        </label>
                    </div>
                    <a className="login-text" ref="loginButton" href="#" onClick={this.handleLogin}>ログイン</a>
                    <Indicator buttonRef={this.state.loginButton} active={this.state.loginIndicatorActive} />
                    または
                    <a className="btn btn-success" onClick={this.handleSignIn}>
                        <i className="glyphicon glyphicon-ok-sign"></i>
                        サインアップ
                    </a>
                </fieldset>
            </div>
        )
    }
});

})();
