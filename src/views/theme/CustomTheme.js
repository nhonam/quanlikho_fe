import { createMuiTheme } from "@material-ui/core/styles";

// config matirial-ui root css
export const MuiTheme = createMuiTheme({
    typography: {
        fontFamily: [
            "-apple-system",
            "BlinkMacSystemFont",
            '"Segoe UI"',
            "Roboto",
            '"Helvetica Neue"',
            "Arial",
            '"Noto Sans"',
            "sans-serif",
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
            '"Noto Color Emoji"',
        ].join(","),
        fontSize: 12.25,
        button: {
            textTransform: "none",
        },
    },
    overrides: {
        MuiPickersToolbar: {
            toolbar: { backgroundColor: "#319acf" },
        },
        MuiPickersDay: {
            day: {
                color: "black",
            },
            daySelected: {
                backgroundColor: "#33abb6",
            },
            dayDisabled: {
                color: "#ccc",
            },
            current: {
                color: "red",
            },
        },
        // MuiPickersModal: {
        //   dialogAction: {
        //     color: '#33abb6',
        //     backgroundColor: 'YOUR HEX HERE',
        //   },
        // },
    },
    notchedOutline: {
        borderWidth: "1px",
        borderColor: "yellow !important",
    },
})
