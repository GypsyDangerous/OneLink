import { createGlobalStyle } from "styled-components";
import chroma from "chroma-js";

const GlobalStyle = createGlobalStyle`
	:root{
		--clr-neutral-100: white;
		--clr-primary-300: #303030;
		--clr-primary-400: #212121;
		--clr-accent-300: #28BF7B;
		--gradient-accent-200: linear-gradient(45deg, #28bf7b 1.69%, #4556df 100%);
		--warn-red: ${chroma("#bb3535").brighten().saturate(2).hex()};
	}

    html,
    body {
    	padding: 0;
        margin: 0;
		font-family: 'Poppins', sans-serif;
        /* overflow: hidden; */
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
		border-radius: 10px;
		background: var(--clr-primary-300)
	}
 
	::-webkit-scrollbar-thumb {
    	border-radius: 10px;
		background: #28BF7B;
	}

	.MuiFormHelperText-contained{
		margin-left: 0px !important;
	}
	
	#nprogress{
		z-index: 10000;
		bar{
			z-index: 1000000 !important;
		}
	}
`;

export default GlobalStyle;
