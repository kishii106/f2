(function() {
"use strict";

var TransitionGroup = React.addons.CSSTransitionGroup;

window.GlobalMenu = React.createClass({
    getInitialState: function() {
        return {
            listVisible: false,
            data: [
                { description: "logout", text: "ログアウト", icon: "log-out" },
                { description: "settings", text: "設定", icon: "cog" }
            ],
        };
    },
    switchListVisible: function() {
        this.setState({ listVisible: !this.state.listVisible });
    },
    handleClick: function(e) {
        this.props.onItemClicked(e);
        this.setState({ listVisible: false });
    },
    render: function() {
        var self = this;
        var items = this.state.data.map(function(data) {
            return (
                <li key={"global-menu-item_" + data.description} className="global-menu-item">
                    <a href="#" onClick={self.handleClick.bind(self, { data: data })}>
                        <i className={"glyphicon glyphicon-" + data.icon} />
                        <span className="global-menu-text">{data.text}</span>
                    </a>
                </li>
            )
        });
        return (
            <div className="GlobalMenu">
                <a className="global-menu-button btn btn-default" onClick={this.switchListVisible}>
                    <i className="glyphicon glyphicon-list" />
                </a>
                <TransitionGroup transitionName="global-menu-list">
                {this.state.listVisible ?
                    <ul key="global-menu-list" className="global-menu-list">
                        {items}
                    </ul> : null
                }
                {this.state.listVisible ?
                    <div className="screen-shutter" onClick={this.switchListVisible}>
                    </div> : null
                }
                </TransitionGroup>
            </div>
        )
    }
});

})();
