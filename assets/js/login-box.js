(function() {
"use strict";

var TransitionGroup = React.addons.CSSTransitionGroup;

window.LoginBox = React.createClass({displayName: "LoginBox",
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
            React.createElement("div", {className: "LoginBox"}, 
                React.createElement(TransitionGroup, {transitionName: "transition-fade"}, 
                    React.createElement(Message, {key: "message_" + this.state.messageVisible, onCloseClick: this.handleMessageCloseClick, visible: this.state.messageVisible, text: this.state.messageText})
                ), 
                React.createElement("fieldset", null, 
                    React.createElement("legend", null, "家族と使う"), 
                    React.createElement("div", {className: "form-group"}, 
                        React.createElement("input", {type: "text", ref: "familyName", className: "form-control family", placeholder: "ファミリー"})
                    ), 
                    React.createElement("div", {className: "form-group"}, 
                        React.createElement("input", {type: "password", ref: "password", className: "form-control password", placeholder: "合言葉"})
                    ), 
                    React.createElement("div", {className: "checkbox"}, 
                        React.createElement("label", null, 
                            React.createElement("input", {type: "checkbox", name: "autoLogin", checked: this.state.autoLogin, onChange: this.handleAutoLoginChange}), 
                            "ログインしたままにする"
                        )
                    ), 
                    React.createElement("a", {className: "login-text", ref: "loginButton", href: "#", onClick: this.handleLogin}, "ログイン"), 
                    React.createElement(Indicator, {buttonRef: this.state.loginButton, active: this.state.loginIndicatorActive}), 
                    "または", 
                    React.createElement("a", {className: "btn btn-success", onClick: this.handleSignIn}, 
                        React.createElement("i", {className: "glyphicon glyphicon-ok-sign"}), 
                        "サインアップ"
                    )
                )
            )
        )
    }
});

})();
