import { extendTheme } from "@chakra-ui/react";

import Input from "./components/input";
import Button from "./components/button";

const customTheme = extendTheme({
  semanticTokens: {
    colors: {
      error: "#ee4c58",
      primary: "#ea1d2c",
    },
  },
  components: {
    Button,
    Input,
  },
});

export default customTheme;
