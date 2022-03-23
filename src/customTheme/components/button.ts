import type { ComponentStyleConfig } from "@chakra-ui/theme";

const Button: ComponentStyleConfig = {
  baseStyle: {},
  defaultProps: {
    size: "lg",
  },
  variants: {
    solid: {
      bg: "primary",
      color: "white",
      _hover: {
        bg: "#c2121f",
        _disabled: {
          bg: "primary",
        },
      },
      _focus: { background: "primary", boxShadow: "none" },
      _active: { background: "primary" },
    },
  },
};

export default Button;
