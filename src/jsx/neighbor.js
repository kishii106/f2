(function() {
"use strict";

window.Neighbor = React.createClass({
    render: function() {
        var classes = React.addons.classSet({
            'hidden': !this.props.visible,
            'neighbor': true,
            'container': true,
        });
        return (
            <div className={classes} />
        )
    }
});

})();
