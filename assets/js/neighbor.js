(function() {
"use strict";

window.Neighbor = React.createClass({displayName: "Neighbor",
    render: function() {
        var classes = React.addons.classSet({
            'hidden': !this.props.visible,
            'neighbor': true,
            'container': true,
        });
        return (
            React.createElement("div", {className: classes})
        )
    }
});

})();
