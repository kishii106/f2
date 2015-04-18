(function() {
"use strinct";

var TransitionGroup = React.addons.CSSTransitionGroup;

var GlobalMenu = React.createClass({
    getInitialState: function() {
        return {
            listVisible: false,
            data: [
                { text: "設定", icon: "cog" },
                { text: "ログアウト", icon: "log-out" },
            ],
        };
    },
    onClick: function() {
        this.setState({ listVisible: !this.state.listVisible });
    },
    render: function() {
        var items = this.state.data.map(function(data) {
            return (
                <li className="menu-item">
                    <i className={"glyphicon glyphicon-" + data.icon} />
                    <span className="menu-text">{data.text}</span>
                </li>
            )
        });
        return (
            <div className="GlobalMenu">
                <a className="menu-button btn btn-default" onClick={this.onClick}>
                    <i className="glyphicon glyphicon-list" />
                </a>
                <TransitionGroup transitionName="menu-list">
                {this.state.listVisible ?
                    <ul key="menu-list" className="menu-list">
                        {items}
                    </ul> : null
                }
                </TransitionGroup>
            </div>
        )
    }
});

var Page = React.createClass({
    render: function() {
        return (
            <div className="Page">
                <GlobalMenu />
            </div>
        )
    }
});

React.render(
    <Page />,
    document.getElementById('page')
);

})();
