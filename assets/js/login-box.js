(function() {
"use strict";

window.LoginBox = React.createClass({displayName: "LoginBox",
    getInitialState: function() {
        return {
            autoLogin: true,
            visible: true,
        };
    },
    componentDidMount: function() {
        $('#login-box .family').focus();
    },
    handleLogin: function(e) {
        this.props.onLoginSucceeed();
    },
    handleSignIn: function(e) {
        alert('サインイン処理：未実装...');
        e.preventDefault();
    },
    handleAutoLoginChange: function() {
        this.setState({ autoLogin: !this.state.autoLogin });
    },
    render: function() {
        return (
            React.createElement("div", {className: "LoginBox"}, 
                React.createElement("fieldset", null, 
                    React.createElement("legend", null, "家族と使う"), 
                    React.createElement("div", {className: "form-group"}, 
                        React.createElement("input", {type: "text", className: "form-control family", ref: "family", placeholder: "ファミリー"})
                    ), 
                    React.createElement("div", {className: "form-group"}, 
                        React.createElement("input", {type: "password", className: "form-control password", ref: "password", placeholder: "合言葉"})
                    ), 
                    React.createElement("div", {className: "checkbox"}, 
                        React.createElement("label", null, 
                            React.createElement("input", {type: "checkbox", name: "autoLogin", checked: this.state.autoLogin, onChange: this.handleAutoLoginChange}), 
                            "ログインしたままにする"
                        )
                    ), 
                    React.createElement("a", {className: "login-text", href: "#", onClick: this.handleLogin}, "ログイン"), 
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
