import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: "roboto";
    src: url(https://s3.amazonaws.com/ycontributors.finance/Roboto-Medium.ttf) format("truetype");
  }

  html,
  body {
    height: 100%;
    width: 100%;
    font-family: roboto;
  }
  
  #app {
    min-height: 100%;
    min-width: 100%;
  }

  p,
  label {
    font-family: Georgia, Times, 'Times New Roman', serif;
    line-height: 1.5em;
  }
`;

export default GlobalStyle;
