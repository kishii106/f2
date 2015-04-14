(function() {
"use strict";

window.MenuRegistration = React.createClass({
    render: function() {
        var classes = React.addons.classSet({
            'hidden': !this.props.visible,
            'menu-registration': true,
            'container': true,
        });
        return (
            <div className={classes} />
        )
    }
});

})();
