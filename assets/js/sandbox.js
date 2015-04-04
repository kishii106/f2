(function() {
"use strinct";

var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

var TodoList = React.createClass({displayName: "TodoList",
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
        React.createElement("div", {key: item, className: "contents", onClick: this.handleRemove.bind(this, i)}, 
            React.createElement(Item, {label: item})
        )
      );
    }.bind(this));
    return (
      React.createElement("div", null, 
        React.createElement("button", {onClick: this.handleAdd}, "Add Item"), 
        React.createElement(ReactCSSTransitionGroup, {transitionName: "example"}, 
            items
        )
      )
    );
  }
});

var Item = React.createClass({displayName: "Item",
    render: function() {
        return (
            React.createElement("span", {className: "Item"}, this.props.label)
        )
    }
});

var Box = React.createClass({displayName: "Box",
});

React.render(
    React.createElement(TodoList, null),
    document.getElementById('todo')
);

})();
