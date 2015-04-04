(function() {
"use strinct";

var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

var TodoList = React.createClass({
  getInitialState: function() {
    return {items: ['hello', 'world', 'click', 'me']};
  },
  handleAdd: function() {
    var newItems =
      this.state.items.concat([prompt('Enter some text')]);
    this.setState({items: newItems});
  },
  handleRemove: function(i) {
    var newItems = this.state.items;
    newItems.splice(i, 1);
    this.setState({items: newItems});
  },
  render: function() {
    var items = this.state.items.map(function(item, i) {
      return (
        <div key={item} className="contents" onClick={this.handleRemove.bind(this, i)}>
            <Item label={item} />
        </div>
      );
    }.bind(this));
    return (
      <div>
        <button onClick={this.handleAdd}>Add Item</button>
        <ReactCSSTransitionGroup transitionName="example">
            {items}
        </ReactCSSTransitionGroup>
      </div>
    );
  }
});

var Item = React.createClass({
    render: function() {
        return (
            <span className="Item">{this.props.label}</span>
        )
    }
});

var Box = React.createClass({
});

React.render(
    <TodoList />,
    document.getElementById('todo')
);

})();
