(function() {
"use strict";

window.MenuItem = React.createClass({
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

})();
