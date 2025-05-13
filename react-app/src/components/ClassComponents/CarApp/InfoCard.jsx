import React from "react";

// stateless component: functional component

// implement your own PureComponent logic
function shallowCompareByKeys(obj1, obj2, keys) {
  if (obj1 === obj2) return true;
  if (!obj1 || !obj2) return false;

  for (let key of keys) {
    if (obj1[key] !== obj2[key]) {
      return false;
    }
  }

  return true;
}

class InfoCard extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      isSold:false,
    };
  }
  // only re-render component during the change of keywords in props.car
  shouldComponentUpdate(nextProps, nextState){
    // const propsKeysToCompare = ["make", "quantity"];
    const propsKeysToCompare = ["car"];
    const stateKeysToCompare = ["isSold"];

    const propsChanged = !shallowCompareByKeys(
      this.props,
      nextProps,
      propsKeysToCompare
    );
    // return !shallowCompareByKeys(this.props.car, nextProps.car, keysToCompare)

    const stateChanged = !shallowCompareByKeys(
      this.state,
      nextState,
      stateKeysToCompare
    );

    return propsChanged || stateChanged;
  } 
  sellClickHandler = () => {
    const { id } = this.props.car;

    this.props.handleSell(id); //Trigger handleSell from parent

    this.setState({ isSold: true });

    setTimeout(() => {
      this.setState({ isSold: false });
    }, 1000);
  };


  render() {
    const { make, quantity, id } = this.props.car;
    // this.props.handleSell(id);
    const { isSold } = this.state;

    console.log(`${make} rendered`);
    return (
      <div
        style={{
          width: "150px",
          height: "200px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: "10px",
          border: "1px solid black",
          padding: "15px",
        }}
      >
        <div>{make}</div>
        <div>{quantity}</div>
        <button onClick={this.sellClickHandler}>
          {isSold ? "Sold" : "Sell"}</button>
      </div>
    );
  }
}

export default InfoCard;
