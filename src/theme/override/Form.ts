const activeLabelStyles = {
    transform: 'scale(0.85) translateY(-26px) translateX(6px)',
}

export const Form = {
    variants: {
        floating: {
            container: {
                _focusWithin: {
                    label: {
                        ...activeLabelStyles,
                    },
                },
                "input:not(:placeholder-shown) + label, .chakra-select__wrapper + label":
                    {
                        ...activeLabelStyles,
                    },
                label: {
                    top: 0,
                    left: 0,
                    zIndex: 2,
                    position: "absolute",
                    pointerEvents: "none",
                    ml: 10,
                    px: 1,
                    mt: "11px",
                    fontSize: "lg",
                    transformOrigin: "left top",
                    color: "gray.400",
                    _after: {
                        content: `""`,
                        position: "absolute",
                        left: 0,
                        bottom: 0,
                        width: "100%",
                        height: "60%",
                        bg: "white",
                        opacity: "1",
                        zIndex: -1
                    }
                },
            },
        },
    },
};