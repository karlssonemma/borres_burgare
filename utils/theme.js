const theme = {
    breakpoints: ['10em', '50em', '75em'],
    colors: {
        green: '#84C318',
        gray: '#edeff2',
        darkgrey: 'darkgrey',
        darkbrown: '#522809',
        mudgreen: '#4B4B25',
        lightbrown: '#A7702A',
        orange: '#E36414',
        lightorange: '#FDC47F',
        buttons: {
            orange: {
                background: '#FB8B24',
                text: 'white',
                hover: {
                    text: 'white',
                    background: '#E36414'
                }
            },
            green: {
                background: '#84C318',
                text: 'white',
                hover: {
                    text: 'white',
                    background: '#bbeb68'
                }
            }
        }
    },
    fonts: {
        spartan: '"Spartan", sans-serif',
        syne: '"Syne Mono", monospace'
    },
    fontSizes: {
        xs: '0.75rem',
        s: '1rem', 
        m: '1.25rem', 
        lg: '1.5rem',
        xl: '2rem'
    },
    space: ['0.25em', '0.5em', '0.75em', '1em']
}

export default theme;