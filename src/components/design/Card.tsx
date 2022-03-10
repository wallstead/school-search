import React from 'react';
import * as CSS from "csstype";
import { Box, useStyleConfig, ResponsiveValue } from "@chakra-ui/react"

export const CardTheme = {
    // The styles all Cards have in common
    baseStyle: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 6,
    },
    // Two variants: rounded and smooth
    variants: {
      rounded: {
        padding: 8,
        borderRadius: "40px",
        boxShadow: "xl",
        border: "2px solid"
      },
      smooth: {
        padding: 6,
        borderRadius: "base",
        boxShadow: "md",
      },
    },
    // The default variant value
    defaultProps: {
      variant: "smooth",
    },
}

export const Card:React.FC<{variant:string, borderColor?:string, pointerEvents?:ResponsiveValue<CSS.Property.PointerEvents>}> = ({variant, children, borderColor, pointerEvents, ...rest}) => {
  const styles = useStyleConfig("Card", { variant })
  // Pass the computed styles into the `__css` prop
  return (
    <Box className="cs-card" __css={styles} borderColor={borderColor} pointerEvents={pointerEvents} {...rest} >
      {children}
    </Box>
  )
}