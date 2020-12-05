import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
	:root{

	}

    html,
    body {
    	padding: 0;
        margin: 0;
		font-family: 'Poppins', sans-serif;
        /* overflow: hidden */
        box-sizing: border-box !important;
    }

    a {
    	color: inherit;
    	text-decoration: none;
    }


    * {
    	box-sizing: border-box;
	}
	
	::-webkit-scrollbar {
		width: 8px;
	  }


	  
`;

export default GlobalStyle;
