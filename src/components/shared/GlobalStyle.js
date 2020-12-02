import { createGlobalStyle } from "styled-components";
import { useContext, useEffect, useState } from "react";

const GlobalStyle = createGlobalStyle`
	:root{

	}

    html,
    body {
    	padding: 0;
        margin: 0;
		font-family: ${props => props.theme.fonts.join(", ")};
        overflow: hidden;
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
	  
	//   /* Track */
	//   ::-webkit-scrollbar-track {
	// 	background: ${props => props.theme.colors.primary.normal};
	//   }
	  
	//   /* Handle */
	//   ::-webkit-scrollbar-thumb {
	// 	background: ${props => props.theme.colors.secondary.dark};
	// 	border-radius: .5rem;
	//   }
	  
	//   /* Handle on hover */
	//   ::-webkit-scrollbar-thumb:hover {
	// 	background: ${props => props.theme.colors.secondary.normal};
	//   }
`;