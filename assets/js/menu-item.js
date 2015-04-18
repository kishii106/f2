(function() {
"use strict";

window.MenuItem = React.createClass({displayName: "MenuItem",
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

})();
