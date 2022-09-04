import { createGlobalStyle } from 'styled-components'
import { useTheme } from '../hooks/useTheme'

const StyledGlobalStyle = createGlobalStyle`
    :root{    
        --primary-color: ${props=> props.isDarkMode ? '#EE6549':'#FD2D01'};
        --secondary-color: ${props=> props.isDarkMode ? '#B75757':'#FFD7D7'};
        --tertiary-color: ${props=> props.isDarkMode ? 'white':'#4E5166'};
        --shadow-color: ${props=> props.isDarkMode ? 'rgba(192, 192, 192, 0.336)':'rgba(129, 129, 129, 0.336)'};
        --success-color: #00B06B;
        --background-color: ${props=> props.isDarkMode ? '#2F2F38':'white'};
        --body-color: ${props=> props.isDarkMode ? '#292931':'#fafafa'};
        --accent-button-color: ${props=> props.isDarkMode ? '#FFD7D7':'#E52901'};
    }
    body{
        background-color: var(--body-color);
        color: var(--tertiary-color);
    }
`

export function GlobalStyle() {
    const {theme}= useTheme()
  return <StyledGlobalStyle isDarkMode={theme === 'dark'} />
}
