// higher-order-component: function
// take a component as argument

// cons: props might override another existing one
// wrapper hell
// harder to debug

import React from "react";

const withCounter = (WrappedComponent) => {
  return class NewComponent extends React.Component {
    state = {
      counter: 0,
      a: 1,
      b: 2,
      c: 3,
    };

    handleAdd = () => {
      this.setState({
        counter: this.state.counter + 1,
      });
    };

    componentDidMount() {
      console.log("logging in hoc");
    }

    render() {
      return (
        <WrappedComponent
          handleAdd={this.handleAdd}
          {...this.props}
          {...this.state}
        />
      );
    }
  };
};

export default withCounter;
