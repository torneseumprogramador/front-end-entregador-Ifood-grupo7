import type { ComponentStyleConfig } from "@chakra-ui/theme";

const Input: ComponentStyleConfig = {
  baseStyle: {
    field: {},
  },
  defaultProps: {
    size: "lg",
  },
  variants: {
    outline: {
      field: {
        borderColor: "gray.300",
        _focus: {
          borderColor: "gray.500",
          boxShadow: "none",
        },
        _hover: {
          borderColor: "gray.400",
        },
      },
    },
  },
};

export default Input;
