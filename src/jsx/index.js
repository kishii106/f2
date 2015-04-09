var TransitionGroup = React.addons.CSSTransitionGroup;

var LoginBox = React.createClass({
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
                <a href="#" onClick={this.handleLogin}>ログイン</a>
                または
                <a className="btn btn-success" onClick={this.handleSignIn}>
                    <i className="glyphicon glyphicon-ok-sign"></i>
                    サインアップ
                </a>
            </fieldset>
        )
    }
});

var GuestMenu = React.createClass({
    getInitialState: function() {
        return {
            active: false,
            wordSearchSelected: false,
            genreSelected: false,
            neighborSelected: false
        };
    },
    handleItemClick: function(e) {
        this.props.onActiveChange({ active: true });
        this.setState({
            active: true,
            wordSearchSelected: e.itemName === 'word-search',
            genreSelected: e.itemName === 'genre',
            neighborSelected: e.itemName === 'neighbor'
        });
    },
    handleTopBoxShow: function() {
        this.props.onActiveChange({ active: false });
        this.setState({
            active: false
        });
    },
    render: function() {
        return (
            <div id="guest-menu">
                <TransitionGroup transitionName="top-box">
                    {!this.state.active ? <h2 className="title-single">一人で使う</h2> : null}
                    {this.state.active ?
                        <button className="btn" onClick= {this.handleTopBoxShow}>
                            <i className="glyphicon glyphicon-list" />
                        </button> : null
                    }
                </TransitionGroup>
                <div className="menu-items">
                    <MenuItem itemName="word-search" iconName="search" itemText="ワード検索" onClick={this.handleItemClick} />
                    <MenuItem itemName="genre" iconName="tags" itemText="ジャンル別" onClick={this.handleItemClick} />
                    <MenuItem itemName="neighbor" iconName="home" itemText="おとなり" onClick={this.handleItemClick} />
                </div>
                {this.state.active ?
                    <div className="contents">
                        <WordSearch visible={this.state.wordSearchSelected} />
                        <Genre visible={this.state.genreSelected} />
                        <Neighbor visible={this.state.neighborSelected} />
                    </div> : null
                }
            </div>
        )
    }
});

var MenuItem = React.createClass({
    handleClick: function(e) {
        var itemTag = $(e.target).parent('.menu-item');
        this.props.onClick( { itemTag: itemTag[0], itemName: this.props.itemName });
    },
    render: function() {
        var classes = React.addons.classSet('menu-item', this.props.itemName);
        var icon = React.addons.classSet('glyphicon', 'glyphicon-' + this.props.iconName);
        return (
            <div className={classes} onClick={this.handleClick}>
                <i className={icon}></i>
                {this.props.itemText}
            </div>
        )
    }
});

var WordSearch = React.createClass({
    render: function() {
        var classes = React.addons.classSet({
            'hidden': !this.props.visible,
            'word-search': true
        });
        return (
            <div className={classes} />
        )
    }
});

var Genre = React.createClass({
    render: function() {
        var classes = React.addons.classSet({
            'hidden': !this.props.visible,
            'genre': true
        });
        return (
            <div className={classes} />
        )
    }
});

var Neighbor = React.createClass({
    render: function() {
        var classes = React.addons.classSet({
            'hidden': !this.props.visible,
            'neighbor': true
        });
        return (
            <div className={classes} />
        )
    }
});

var TopBox = React.createClass({
    render: function() {
        var classes = React.addons.classSet({'TopBox': true});
        return (
            <div id="top-box" className={classes}>
                <div id="catch-copy">
                    <h2>今日、なに食べる？</h2>
                    <p>ふ〜どふぁいんだ〜がメニューを提案します。</p>
                    <p>今日もあなたの食事が楽しくなりますように。</p>
                </div>
                <div id="login-box">
                    <LoginBox />
                </div>
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
    render: function() {
        return (
            <div>
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
