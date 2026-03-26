import React from "react";

export const createCellRenderer = (Component, extraProps = {}) => {
  return (props) => {
    return <Component {...props} {...extraProps} />;
  };
};