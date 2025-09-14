import React from "react";
import { Text } from "react-native";

export default function applyGlobalFont(font = "Poppins") {
  if (Text.render) {
    const oldRender = Text.render;
    Text.render = function (...args) {
      const origin = oldRender.call(this, ...args);
      return React.cloneElement(origin, {
        style: [{ fontFamily: font }, origin.props.style],
      });
    };
  }
}