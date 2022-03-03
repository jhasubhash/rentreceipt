import { createGlobalStyle } from "styled-components"
import { lighten, darken } from 'polished'

export const lightTheme = {
  body: '#FFF',
  text: '#363537',
  toggleBorder: '#FFF',
  background: '#363537',
  type: 'light',
}

export const darkTheme = {
  body: '#1f1f1f',
  text: '#FAFAFA',
  toggleBorder: '#6B8096',
  background: '#999',
  type: 'dark',
}

export const getShadowColor = (theme, val, clr) => {
  return theme.type == 'dark' ? darken(val, clr) : lighten(val, clr);
}

export const GlobalStyles = createGlobalStyle`
  body {
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    font-family: Tahoma, Helvetica, Arial, Roboto, sans-serif;
    transition: all 0.50s linear;
    oveflow-x: hidden;
  }

  a {
      color: ${({ theme }) => theme.text};
      cursor: pointer;
  }

  .btn {
    color: ${({ theme }) => theme.text};
    background: ${({ theme }) => getShadowColor(theme, 0.70, theme.text)};
    border-color: ${({ theme }) => theme.text};
    display: inline-block;
    padding: 8px 16px;
    border-radius: 2px;
    cursor: pointer;
    text-decoration: none;
    font-size: 15px;
    font-family: inherit;
  }

  .btn:hover {
    transform: scale(0.98);
  }

  .btn:focus {
    outline: none;
  }

  .linkinactive{
    color: ${({ theme }) => getShadowColor(theme, 0.25, theme.text)};
  }

  .avatar {
      width:auto;
      border-radius:50%;
  }

`