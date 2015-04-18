(function() {
"use strict";

window.Genre = React.createClass({displayName: "Genre",
    getInitialState: function() {
        return {
            buttonRef: null,
            indicatorActive: false,
        }
    },
    componentDidMount: function() {
        this.setState({ buttonRef: React.findDOMNode(this.refs.button) });
    },
    handleClick: function() {
        this.setState({indicatorActive: true});
    },
    render: function() {
        var classes = React.addons.classSet({
            'hidden': !this.props.visible,
            'genre': true,
            'container': true,
        });
        return (
            React.createElement("div", {className: classes}, 
                React.createElement("fieldset", null, 
                    React.createElement("div", {className: "input-group"}, 
                        React.createElement("input", {type: "text", className: "form-control", placeholder: "ジャンル"}), 
                        React.createElement("span", {className: "input-group-btn"}, 
                            React.createElement("button", {className: "btn btn-default", type: "button", ref: "button", onClick: this.handleClick}, 
                                "Go!"
                            ), 
                            React.createElement(Indicator, {buttonRef: this.state.buttonRef, active: this.state.indicatorActive})
                        )
                    )
                )
            )
        )
    }
});

})();
