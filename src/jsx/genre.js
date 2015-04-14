(function() {
"use strict";

window.Genre = React.createClass({
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
            'Genre': true,
            'container': true,
        });
        return (
            <div className={classes}>
                <fieldset>
                    <div className="input-group">
                        <input type="text" className="form-control" placeholder="ジャンル" />
                        <span className="input-group-btn">
                            <button className="btn btn-default" type="button" ref="button" onClick={this.handleClick}>
                                Go!
                            </button>
                            <Indicator buttonRef={this.state.buttonRef} active={this.state.indicatorActive} />
                        </span>
                    </div>
                </fieldset>
            </div>
        )
    }
});

})();
