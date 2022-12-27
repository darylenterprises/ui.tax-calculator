import React from "react";
import { Client as Styletron } from "styletron-engine-atomic";
import { Provider as StyletronProvider } from "styletron-react";
import ThemeProvider from "./providers/ThemeProvider";
import PreferenceProvider from "./providers/PreferenceProvider";

const engine = new Styletron();

const Providers: React.FC = (props) => {
  return (
    <StyletronProvider value={engine}>
      <ThemeProvider theme={"light"}>
        <PreferenceProvider>{props.children}</PreferenceProvider>
      </ThemeProvider>
    </StyletronProvider>
  );
};

export default Providers;
