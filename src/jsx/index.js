(function($) {
"use strict";

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
                <a className="login-text" href="#" onClick={this.handleLogin}>ログイン</a>
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
            data: [
                { itemName: "word-search", iconName: "search", itemText: "ワード検索" },
                { itemName: "genre", iconName: "tags", itemText: "ジャンル別" },
                { itemName: "neighbor", iconName: "home", itemText: "おとなり" },
                { itemName: "menu-registration", iconName: "plus", itemText: "メニュー追加" },
            ]
        };
    },
    handleItemClick: function(e) {
        this.props.onActiveChange({ active: true });
        this.setState({
            active: true,
            activeMenuName: e.itemName,
        });
    },
    render: function() {
        var self = this;
        var items = this.state.data.map(function(data) {
            return (
                <MenuItem key={data.itemName} itemName={data.itemName} iconName={data.iconName} itemText={data.itemText} onClick={self.handleItemClick} />
            )
        });
        return (
            <div id="guest-menu">
                <TransitionGroup transitionName="top-box">
                    {!this.state.active ? <h2 className="title-single">一人で使う</h2> : null}
                </TransitionGroup>
                <div className="menu-items">
                    {items}
                </div>
                {this.state.active ?
                    <div className="contents">
                        <WordSearch visible={this.state.activeMenuName === "word-search"} />
                        <Genre visible={this.state.activeMenuName === "genre"} />
                        <Neighbor visible={this.state.activeMenuName === "neighbor"} />
                        <MenuRegistration visible={this.state.activeMenuName === "menu-registration"} />
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
        return (
            <div className={"menu-item " + this.props.itemName} onClick={this.handleClick}>
                <i className={"glyphicon glyphicon-" + this.props.iconName}></i>
                {this.props.itemText}
            </div>
        )
    }
});

var WordSearch = React.createClass({
    getInitialState: function() {
        return {
            menuList: []
        };
    },
    handleSearch: function() {
        var keyword = React.findDOMNode(this.refs.keyword).value;
        var self = this;
        $.get("/menu/", { keyword: keyword }, function(data) {
            self.setState({menuList: data});
        });
    },
    render: function() {
        var classes = React.addons.classSet({
            'hidden': !this.props.visible,
            'word-search': true
        });
        var menuList = this.state.menuList.map(function(menu) {
            return (
                <tr>
                    <td>{menu.name}</td>
                </tr>
            )
        });
        return (
            <div className={classes}>
                <fieldset>
                    <div className="input-group">
                        <input type="text" ref="keyword" className="form-control" placeholder="キーワード" />
                        <span className="input-group-btn">
                            <button className="btn btn-default" type="button" onClick={this.handleSearch}>
                                <i className="glyphicon glyphicon-search" />
                            </button>
                        </span>
                    </div>
                </fieldset>
                <table className="table">
                    {menuList}
                </table>
            </div>
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
            <div className={classes}>
                <fieldset>
                    <div className="input-group">
                        <input type="text" className="form-control" placeholder="キーワード" />
                        <span className="input-group-btn">
                            <button className="btn btn-default" type="button">Go!</button>
                        </span>
                    </div>
                </fieldset>
            </div>
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

var MenuRegistration = React.createClass({
    render: function() {
        var classes = React.addons.classSet({
            'hidden': !this.props.visible,
            'menu-registration': true
        });
        return (
            <div className={classes}>
            </div>
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

var GlobalMenu = React.createClass({
    getInitialState: function() {
        return {
            listVisible: false,
            data: [
                { description: "word-search", text: "ワード検索", icon: "search" },
                { description: "genre", text: "ジャンル別", icon: "tags" },
                { description: "neighbor", text: "おとなり", icon: "home" },
                { description: "settings", text: "設定", icon: "cog" },
                { description: "login", text: "ログイン", icon: "log-in" },
            ],
        };
    },
    switchListVisible: function() {
        this.setState({ listVisible: !this.state.listVisible });
    },
    handleClick: function(e) {
        this.props.onItemClicked(e);
        this.setState({ listVisible: false });
    },
    render: function() {
        var self = this;
        var items = this.state.data.map(function(data) {
            return (
                <li key={"global-menu-item_" + data.description} className="global-menu-item">
                    <a href="#" onClick={self.handleClick.bind(self, { data: data })}>
                        <i className={"glyphicon glyphicon-" + data.icon} />
                        <span className="global-menu-text">{data.text}</span>
                    </a>
                </li>
            )
        });
        return (
            <div className="GlobalMenu">
                <a className="global-menu-button btn btn-default" onClick={this.switchListVisible}>
                    <i className="glyphicon glyphicon-list" />
                </a>
                <TransitionGroup transitionName="global-menu-list">
                {this.state.listVisible ?
                    <ul key="global-menu-list" className="global-menu-list">
                        {items}
                    </ul> : null
                }
                {this.state.listVisible ?
                    <div className="screen-shutter" onClick={this.switchListVisible}>
                    </div> : null
                }
                </TransitionGroup>
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
