import { createTheme, responsiveFontSizes } from '@material-ui/core/styles';

let theme = createTheme({
    palette: {
        primary: {
            main: '#efeff1',
            dark: '#bebebf',
            light: '#ffffff'
        },
        secondary: {
            main: '#6441a5',
            light: '#956dd7'
        },
        live: {
            main: '#e91916'
        }
    },
    typography: {
        fontFamily: [
            'Inter',
            'system-ui',
            'Roboto',
            'Arial',
            'sans-serif',
        ].join(','),
        h5: {
            fontWeight: 600
        }
    }
});

theme = responsiveFontSizes(theme);

export default theme;
