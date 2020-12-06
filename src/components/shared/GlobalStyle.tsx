import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
	:root{
		--clr-neutral-100: white;
		--clr-primary-300: #303030;
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
 
::-webkit-scrollbar-track {
	background: var(--clr-primary-300)
}
 
::-webkit-scrollbar-thumb {
    border-radius: 10px;
	background: #28BF7B;
}


	  
`;

export default GlobalStyle;
