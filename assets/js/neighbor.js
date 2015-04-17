(function($) {
"use strict";

window.Neighbor = React.createClass({displayName: "Neighbor",
    getInitialState: function() {
        return {
            data: []
        };
    },
    componentDidMount: function() {
        $.ajax({
            url: '/neighbor-menu/',
            type: 'get',
            success: function(data) {
                this.setState({data: data});
            }.bind(this),
            fail: function() {
                console.log(arguments);
            },
        });
    },
    render: function() {
        var classes = React.addons.classSet({
            'hidden': !this.props.visible,
            'Neighbor': true,
            'container': true,
        });
        var menus = this.state.data.map(function(data) {
            return (
                React.createElement("li", {key: data.id}, 
                    React.createElement("a", {href: "#"}, 
                        React.createElement("span", {className: "menu-name", style: { fontSize: ((data.PopularLevel + 100) + '%')}}, data.name)
                    )
                )
            );
        });
        return (
            React.createElement("div", {className: classes}, 
                React.createElement("ul", null, 
                menus
                )
            )
        )
    }
});

})(jQuery);