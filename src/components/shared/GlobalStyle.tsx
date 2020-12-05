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

	  .grid{
	padding: 40px 77px;
	display: grid;
	width: 100vw;
	height: 100vh;
	grid-template-areas: 
	"header header"
	"img text"
	"footer footer";
}



.header{
	grid-area: header;
	/* padding: 1.5rem */
	text-transform: uppercase;
	font-weight: bold;
	font-size: 1.5rem;
	/* font-family: Inconsolata, "sans-serif" */
	margin-bottom: 2rem;
}

.grid img{
	grid-area: img;
	width: 80%;
	max-width: 540px;
	min-width: 200px;
}

.text{

}

.text h1{
	font-size: 4rem;
	font-weight: bold;
	max-width: 590px;
}

.text p{
	margin-top: 2.5rem;
	max-width: 390px;
	font-size: 1.5rem;
}

.text a{
	color: white;
	text-transform: uppercase;
	text-decoration: none;
	display: inline-block;
	margin-top: 4rem;
	font-size: .75rem;
	padding: 1.5rem 2rem ;
	background: #333333;
}

.footer{
	grid-area: footer;
	align-self: end;
	justify-self: center;
	margin-top: auto;
	font-size: .75rem;
}

@media screen and (max-width: 900px){
	.grid{
		padding: 30px 67px;
		grid-template-areas:
		"header"
		"img"
		"text"
		"footer";
		justify-content: center;
		align-items: center;
	}

	.text h1{
		font-size: 2rem;
	}

	.text p{
		font-size: 1.25rem;
	}
}
	  
`;

export default GlobalStyle;
