import React from "react";

const withTimestamp = (WrappedComponent) => {
  return function WithTimestamp(props) {
    const timestamp = new Date().toLocaleTimeString();

    return (
      <div style={{ border: "1px solid lightgray", padding: "10px" }}>
        <WrappedComponent {...props} timestamp={timestamp} />
        <p style={{ fontSize: "0.8rem", color: "gray" }}>
          Rendered at: {timestamp}
        </p>
      </div>
    );
  };
};

export default withTimestamp;

