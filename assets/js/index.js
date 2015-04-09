var TransitionGroup = React.addons.CSSTransitionGroup;

var LoginBox = React.createClass({displayName: "LoginBox",
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
    }
});

var GuestMenu = React.createClass({displayName: "GuestMenu",
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
    handleTopBoxShow: function() {
        this.props.onActiveChange({ active: false });
        this.setState({
            active: false,
        });
    },
    render: function() {
        var self = this;
        var items = this.state.data.map(function(data) {
            return (
                React.createElement(MenuItem, {key: data.itemName, itemName: data.itemName, iconName: data.iconName, itemText: data.itemText, onClick: self.handleItemClick})
            )
        });
        return (
            React.createElement("div", {id: "guest-menu"}, 
                React.createElement(TransitionGroup, {transitionName: "top-box"}, 
                    !this.state.active ? React.createElement("h2", {className: "title-single"}, "一人で使う") : null, 
                    this.state.active ?
                        React.createElement("button", {className: "btn", onClick: this.handleTopBoxShow}, 
                            React.createElement("i", {className: "glyphicon glyphicon-list"})
                        ) : null
                    
                ), 
                React.createElement("div", {className: "menu-items"}, 
                    items
                ), 
                this.state.active ?
                    React.createElement("div", {className: "contents"}, 
                        React.createElement(WordSearch, {visible: this.state.activeMenuName === "word-search"}), 
                        React.createElement(Genre, {visible: this.state.activeMenuName === "genre"}), 
                        React.createElement(Neighbor, {visible: this.state.activeMenuName === "neighbor"}), 
                        React.createElement(MenuRegistration, {visible: this.state.activeMenuName === "menu-registration"})
                    ) : null
                
            )
        )
    }
});

var MenuItem = React.createClass({displayName: "MenuItem",
    handleClick: function(e) {
        var itemTag = $(e.target).parent('.menu-item');
        this.props.onClick( { itemTag: itemTag[0], itemName: this.props.itemName });
    },
    render: function() {
        return (
            React.createElement("div", {className: "menu-item " + this.props.itemName, onClick: this.handleClick}, 
                React.createElement("i", {className: "glyphicon glyphicon-" + this.props.iconName}), 
                this.props.itemText
            )
        )
    }
});

var WordSearch = React.createClass({displayName: "WordSearch",
    render: function() {
        var classes = React.addons.classSet({
            'hidden': !this.props.visible,
            'word-search': true
        });
        return (
            React.createElement("div", {className: classes}, 
                React.createElement("fieldset", null, 
                    React.createElement("div", {className: "input-group"}, 
                        React.createElement("input", {type: "text", className: "form-control", placeholder: "キーワード"}), 
                        React.createElement("span", {className: "input-group-btn"}, 
                            React.createElement("button", {className: "btn btn-default", type: "button"}, "Go!")
                        )
                    )
                )
            )
        )
    }
});

var Genre = React.createClass({displayName: "Genre",
    render: function() {
        var classes = React.addons.classSet({
            'hidden': !this.props.visible,
            'genre': true
        });
        return (
            React.createElement("div", {className: classes}, 
                React.createElement("fieldset", null, 
                    React.createElement("div", {className: "input-group"}, 
                        React.createElement("input", {type: "text", className: "form-control", placeholder: "キーワード"}), 
                        React.createElement("span", {className: "input-group-btn"}, 
                            React.createElement("button", {className: "btn btn-default", type: "button"}, "Go!")
                        )
                    )
                )
            )
        )
    }
});

var Neighbor = React.createClass({displayName: "Neighbor",
    render: function() {
        var classes = React.addons.classSet({
            'hidden': !this.props.visible,
            'neighbor': true
        });
        return (
            React.createElement("div", {className: classes})
        )
    }
});

var MenuRegistration = React.createClass({displayName: "MenuRegistration",
    render: function() {
        var classes = React.addons.classSet({
            'hidden': !this.props.visible,
            'menu-registration': true
        });
        return (
            React.createElement("div", {className: classes}
            )
        )
    }
});

var TopBox = React.createClass({displayName: "TopBox",
    render: function() {
        var classes = React.addons.classSet({'TopBox': true});
        return (
            React.createElement("div", {id: "top-box", className: classes}, 
                React.createElement("div", {id: "catch-copy"}, 
                    React.createElement("h2", null, "今日、なに食べる？"), 
                    React.createElement("p", null, "ふ〜どふぁいんだ〜がメニューを提案します。"), 
                    React.createElement("p", null, "今日もあなたの食事が楽しくなりますように。")
                ), 
                React.createElement("div", {id: "login-box"}, 
                    React.createElement(LoginBox, null)
                )
            )
        )
    }
});

var Page = React.createClass({displayName: "Page",
    getInitialState: function() {
        return { topBoxVisible: true };
    },
    handleGuestMenuActiveChange: function(e) {
        this.setState({ topBoxVisible: !e.active });
    },
    render: function() {
        return (
            React.createElement("div", null, 
                React.createElement(TransitionGroup, {transitionName: "top-box"}, 
                    this.state.topBoxVisible ? React.createElement(TopBox, null) : null
                ), 
                React.createElement(GuestMenu, {onActiveChange: this.handleGuestMenuActiveChange})
            )
        )
    }
});

var GlobalMenu = React.createClass({displayName: "GlobalMenu",
    getInitialState: function() {
        return {
            listVisible: false,
            data: [
                { text: "ワード検索", icon: "search" },
                { text: "ジャンル別", icon: "tags" },
                { text: "おとなり", icon: "home" },
                { text: "設定", icon: "cog" },
                { text: "ログアウト", icon: "log-out" },
            ],
        };
    },
    switchListVisible: function() {
        this.setState({ listVisible: !this.state.listVisible });
    },
    render: function() {
        var items = this.state.data.map(function(data) {
            return (
                React.createElement("li", {className: "global-menu-item"}, 
                    React.createElement("a", {href: "#"}, 
                        React.createElement("i", {className: "glyphicon glyphicon-" + data.icon}), 
                        React.createElement("span", {className: "global-menu-text"}, data.text)
                    )
                )
            )
        });
        return (
            React.createElement("div", {className: "GlobalMenu"}, 
                React.createElement("a", {className: "global-menu-button btn btn-default", onClick: this.switchListVisible}, 
                    React.createElement("i", {className: "glyphicon glyphicon-list"})
                ), 
                React.createElement(TransitionGroup, {transitionName: "global-menu-list"}, 
                this.state.listVisible ?
                    React.createElement("ul", {key: "global-menu-list", className: "global-menu-list"}, 
                        items
                    ) : null, 
                
                this.state.listVisible ?
                    React.createElement("div", {className: "screen-shutter", onClick: this.switchListVisible}
                    ) : null
                
                )
            )
        )
    }
});

React.render(
    React.createElement(GlobalMenu, null),
    document.getElementById("global-menu")
);
React.render(
    React.createElement(Page, null),
    document.getElementById('page')
);
