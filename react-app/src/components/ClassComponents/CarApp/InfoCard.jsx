import React from "react";

// stateless component: functional component

// implement your own PureComponent logic
class InfoCard extends React.PureComponent {
  render() {
    const { make, quantity, id } = this.props.car;

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
        <button onClick={() => this.props.handleSell(id)}>Sell</button>
      </div>
    );
  }
}

export default InfoCard;
