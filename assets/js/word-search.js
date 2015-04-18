(function() {
"use strict";

window.WordSearch = React.createClass({displayName: "WordSearch",
    getInitialState: function() {
        return {
            menuList: [],
            indicatorActive: false,
            buttonRef: null,
        };
    },
    componentDidMount: function() {
        this.setState({ buttonRef: React.findDOMNode(this.refs.button) });
    },
    handleSearch: function() {
        this.setState({indicatorActive: true});

        var keyword = React.findDOMNode(this.refs.keyword).value;
        var self = this;
        $.ajax({
            url: "/menu/",
            type: "get",
            data: { keyword: keyword },
            success: function(data) {
                self.setState({menuList: data});
            },
            fail: function() {
                console.log(arguments);
            },
            complete: function() {
                this.setState({indicatorActive: false});
            }.bind(this),
        });
    },
    render: function() {
        var classes = React.addons.classSet({
            'hidden': !this.props.visible,
            'word-search': true,
            'container': true,
        });
        var menuList = this.state.menuList.map(function(menu) {
            return (
                React.createElement("tr", {key: menu.id}, 
                    React.createElement("td", null, menu.id), 
                    React.createElement("td", null, menu.name)
                )
            )
        });
        return (
            React.createElement("div", {className: classes}, 
                React.createElement("fieldset", null, 
                    React.createElement("div", {className: "input-group"}, 
                        React.createElement("input", {type: "text", ref: "keyword", className: "form-control", placeholder: "キーワード"}), 
                        React.createElement("span", {className: "input-group-btn"}, 
                            React.createElement("button", {ref: "button", className: "btn btn-default", type: "button", onClick: this.handleSearch}, 
                                React.createElement("i", {className: "glyphicon glyphicon-search"})
                            ), 
                            React.createElement(Indicator, {buttonRef: this.state.buttonRef, active: this.state.indicatorActive})
                        )
                    )
                ), 
                React.createElement("table", {className: "table table-striped"}, 
                    React.createElement("thead", null, 
                        React.createElement("tr", null, 
                            React.createElement("th", null, "ID"), 
                            React.createElement("th", null, "メニュー名")
                        )
                    ), 
                    React.createElement("tbody", null, 
                        menuList
                    )
                )
            )
        )
    }
});

})();
