(function($) {
"use strict";

window.Neighbor = React.createClass({
    getInitialState: function() {
        return {
            data: []
        };
    },
    componentDidMount: function() {
        $.ajax({
            url: '/neighbor-menu/',
            type: 'get',
            success: function(data) {
                this.setState({data: data});
            }.bind(this),
            fail: function() {
                console.log(arguments);
            },
        });
    },
    render: function() {
        var classes = React.addons.classSet({
            'hidden': !this.props.visible,
            'Neighbor': true,
            'container': true,
        });
        var menus = this.state.data.map(function(data) {
            return (
                <li key={data.id}>
                    <a href="#">
                        <span className="menu-name" style={{ fontSize: ((data.PopularLevel + 100) + '%') }}>{data.name}</span>
                    </a>
                </li>
            );
        });
        return (
            <div className={classes}>
                <ul>
                {menus}
                </ul>
            </div>
        )
    }
});

})(jQuery);
