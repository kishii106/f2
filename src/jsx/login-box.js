(function() {
"use strict";

window.LoginBox = React.createClass({
    getInitialState: function() {
        return { autoLogin: true };
    },
    componentDidMount: function() {
        $('#login-box .family').focus();
    },
    handleLogin: function(e) {
        alert('ログイン処理：未実装...');
        e.preventDefault();
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
            <div className="LoginBox">
                <fieldset>
                    <legend>家族と使う</legend>
                    <div className="form-group">
                        <input type="text" className="form-control family" ref="family" placeholder="ファミリー" />
                    </div>
                    <div className="form-group">
                        <input type="password" className="form-control password" ref="password" placeholder="合言葉" />
                    </div>
                    <div className="checkbox">
                        <label>
                            <input type="checkbox" name="autoLogin" checked={this.state.autoLogin} onChange={this.handleAutoLoginChange} />
                            ログインしたままにする
                        </label>
                    </div>
                    <a className="login-text" href="#" onClick={this.handleLogin}>ログイン</a>
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
