(function() {
"use strict";

window.MenuRegistration = React.createClass({displayName: "MenuRegistration",
    render: function() {
        var classes = React.addons.classSet({
            'hidden': !this.props.visible,
            'menu-registration': true,
            'container': true,
        });
        return (
            React.createElement("div", {className: classes})
        )
    }
});

})();
