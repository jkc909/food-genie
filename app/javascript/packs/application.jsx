import React from 'react';
import App from '../react/components/app'
import { render } from "react-dom";

document.addEventListener("DOMContentLoaded", () => {
  render(
    <App />,
    document.body.appendChild(document.createElement("div"))
  );
});