(function($) {
"use strict";

var TransitionGroup = React.addons.CSSTransitionGroup;

var RegistrationForm = React.createClass({displayName: "RegistrationForm",
    handleDragOver: function(e) {
        e.preventDefault();
    },
    handleDrop: function() {
        console.log(arguments);
    },
    componentDidMount: function() {
        $(".RegistrationForm .file-drop-area").on("dragover", function(e) {
            e.preventDefault();
            return true;
        });
    },
    render: function() {
        return (
            React.createElement("form", {className: "RegistrationForm"}, 
                React.createElement("div", {className: "form-group"}, 
                    React.createElement("div", {className: "file-drop-area", onDragOver: this.handleDragOver, onDrop: this.handleDrop}, 
                        "ここにファイルをドロップ"
                    )
                )
            )
        )
    }
});

var Page = React.createClass({displayName: "Page",
    render: function() {
        return (
            React.createElement("div", {className: "Page container"}, 
                React.createElement(RegistrationForm, null)
            )
        )
    }
});

React.render(
    React.createElement(Page, null),
    document.getElementById('page')
);

})(jQuery);
