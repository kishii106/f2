(function() {
"use strict";

window.WordSearch = React.createClass({
    getInitialState: function() {
        return {
            menuList: [],
            indicatorActive: false,
            buttonRef: null,
        };
    },
    componentDidMount: function() {
        this.setState({ buttonRef: React.findDOMNode(this.refs.button) });
    },
    handleSearch: function() {
        this.setState({indicatorActive: true});

        var keyword = React.findDOMNode(this.refs.keyword).value;
        var self = this;
        $.ajax({
            url: "/menu/",
            type: "get",
            data: { keyword: keyword },
            success: function(data) {
                self.setState({menuList: data});
            },
            fail: function() {
                console.log(arguments);
            },
            complete: function() {
                this.setState({indicatorActive: false});
            }.bind(this),
        });
    },
    render: function() {
        var classes = React.addons.classSet({
            'hidden': !this.props.visible,
            'word-search': true,
            'container': true,
        });
        var menuList = this.state.menuList.map(function(menu) {
            return (
                <tr key={menu.id}>
                    <td>{menu.id}</td>
                    <td>{menu.name}</td>
                </tr>
            )
        });
        return (
            <div className={classes}>
                <fieldset>
                    <div className="input-group">
                        <input type="text" ref="keyword" className="form-control" placeholder="キーワード" />
                        <span className="input-group-btn">
                            <button ref="button" className="btn btn-default" type="button" onClick={this.handleSearch}>
                                <i className="glyphicon glyphicon-search" />
                            </button>
                            <Indicator buttonRef={this.state.buttonRef} active={this.state.indicatorActive} />
                        </span>
                    </div>
                </fieldset>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>メニュー名</th>
                        </tr>
                    </thead>
                    <tbody>
                        {menuList}
                    </tbody>
                </table>
            </div>
        )
    }
});

})();
