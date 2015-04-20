(function($) {
"use strict";

var TransitionGroup = React.addons.CSSTransitionGroup;

var RegistrationForm = React.createClass({
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
            <form className="RegistrationForm">
                <div className="form-group">
                    <div className="file-drop-area" onDragOver={this.handleDragOver} onDrop={this.handleDrop}>
                        ここにファイルをドロップ
                    </div>
                </div>
            </form>
        )
    }
});

var Page = React.createClass({
    render: function() {
        return (
            <div className="Page container">
                <RegistrationForm />
            </div>
        )
    }
});

React.render(
    <Page />,
    document.getElementById('page')
);

})(jQuery);
