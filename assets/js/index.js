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
                React.createElement("a", {href: "#", onClick: this.handleLogin}, "ログイン"), 
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
            React.createElement("div", {id: "guest-menu"}, 
                React.createElement(TransitionGroup, {transitionName: "top-box"}, 
                    !this.state.active ? React.createElement("h2", {className: "title-single"}, "一人で使う") : null, 
                    this.state.active ?
                        React.createElement("button", {className: "btn", onClick: this.handleTopBoxShow}, 
                            React.createElement("i", {className: "glyphicon glyphicon-list"})
                        ) : null
                    
                ), 
                React.createElement("div", {className: "menu-items"}, 
                    React.createElement(MenuItem, {itemName: "word-search", iconName: "search", itemText: "ワード検索", onClick: this.handleItemClick}), 
                    React.createElement(MenuItem, {itemName: "genre", iconName: "tags", itemText: "ジャンル別", onClick: this.handleItemClick}), 
                    React.createElement(MenuItem, {itemName: "neighbor", iconName: "home", itemText: "おとなり", onClick: this.handleItemClick})
                ), 
                this.state.active ?
                    React.createElement("div", {className: "contents"}, 
                        React.createElement(WordSearch, {visible: this.state.wordSearchSelected}), 
                        React.createElement(Genre, {visible: this.state.genreSelected}), 
                        React.createElement(Neighbor, {visible: this.state.neighborSelected})
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
        var classes = React.addons.classSet('menu-item', this.props.itemName);
        var icon = React.addons.classSet('glyphicon', 'glyphicon-' + this.props.iconName);
        return (
            React.createElement("div", {className: classes, onClick: this.handleClick}, 
                React.createElement("i", {className: icon}), 
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
            React.createElement("div", {className: classes})
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
            React.createElement("div", {className: classes})
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

React.render(
    React.createElement(Page, null),
    document.getElementById('page')
);
