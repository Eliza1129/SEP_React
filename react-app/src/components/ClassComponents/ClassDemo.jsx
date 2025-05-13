import React from "react";

// props
class ClassDemo extends React.PureComponent {
  // constructor(props) {
  //   super(props);
  //   // console.log(props);

  //   this.state = {
  //     counter: 0,
  //   };

  //   // bind method
  //   this.handleAdd = this.handleAdd.bind(this);
  // }

  // shorthand way to initialize component state
  state = {
    counter: 0,
    timer: 0,
  };

  // handleAdd() {
  //   // console.log(this);
  //   this.setState({
  //     counter: this.state.counter + 1,
  //   });
  // }

  // automatically bind this context
  handleAdd = () => {
    // setState is async
    // react batches multiple state updates together
    // this.setState({
    //   counter: this.state.counter + 1, // 0 + 1 -> 1
    // });
    // console.log(this.state.counter);
    // this.setState({
    //   counter: this.state.counter + 1, // 0 + 1 -> 1
    // });

    this.setState((prev) => {
      // immutable
      return { counter: prev.counter + 1 }; // 0 + 1 -> 1
    });
    this.setState((prev) => {
      return { counter: prev.counter + 1 }; // 1 + 1 -> 2
    });
  };

  render() {
    // console.log(this.props);
    // console.log(this.state);
    console.log(this.props.children);
    console.log("component rendered");
    return (
      <div>
        <h3>Class Component Demo</h3>
        <p>Counter: {this.state.counter}</p>
        <button onClick={this.handleAdd}>Add 2 to counter</button>
        {/* special prop */}
        {this.props.children}
      </div>
    );
  }

  componentDidMount() {
    console.log("componentDidMount");
    // this.intervalId = setInterval(() => {
    //   console.log("timer is running");
    //   // this.setState({
    //   //   timer: this.state.timer + 1,
    //   // });
    // }, 1000);
  }

  componentDidUpdate() {
    // console.log("current time:", this.state.timer);
    // console.log("componentDidUpdate");
    // if (this.state.counter >= 10) {
    //   console.log("reached maximum");
    // }
  }

  // cleanup
  componentWillUnmount() {
    console.log("componentWillUnmount");
    // clearInterval(this.intervalId);
  }

  // react does shallow comparison on state and props objects
  // immutability
  // shouldComponentUpdate(nextProps, nextState) {
  //     if (
  //       nextProps.name === this.props.name &&
  //       nextState.counter === this.state.counter
  //     )
  //       return false;

  //     return true;

  //   console.log("props:", nextProps === this.props);
  //   console.log("state:", nextState === this.state);

  //   return false;
  // }
}

export default ClassDemo;

// class Person {
//   constructor(name) {
//     this.name = name;
//   }

//   greeting() {
//     console.log(this.name);
//   }
// }

// const p1 = new Person("alice");
// p1.greeting();

// const hello = p1.greeting;

// console.log(this);
// hello();
