import styled from 'styled-components';

export const StyledSidebar = styled.div`
  background-color: #232b2b;
  border-right: 7px solid #071e17;
  text-align: center;
  height: 100vh;
  display: grid;
  grid-template-columns: 100%;
  @media (max-width: 700px) {
    z-index: 99;   
    border: 0;
    width: 100vw;
    overflow: hidden;
  opacity: ${props => props.opacity ? '1' : '0'};
  transition: opacity .5s ease;
  }
`;

export const MobileHamburger = styled.div`
  @media (max-width: 700px) {
    position: fixed;
    top: 0.3em;
    right: 0.3em;
    display: flex;
    justify-content: space-between;
    height: 1.5em;
    border: 0;
    align-items: baseline;
    z-index: 999;
  }
`;

export const Hamburger = styled.button`
  display: none;
  @media (max-width: 700px) {
    display: flex;
    padding: 0;
    margin: 0;
  } 
`;

export const Logo = styled.h1`
  font-size: 2em;
  margin: 0;
  cursor: pointer;
  opacity: 0.8;
  @media (max-width: 700px) {
    font-size: 1.3em; 
    display: none;
  }
`;

export const ListHeadline = styled.h3`
  display: none;
  background-color: #232b2b;
  margin: 0;
  @media (max-width: 700px) {
    position: fixed;
    top: 0;
    left: 0.3em;
    display: block;
    width: 70%;
    text-align: left;
  }
`;

export const LoginButtons = styled.div`
  display: flex;
  justify-content: space-evenly;
  padding: 1em;
  height: 1em;
  opacity: 0.5;
  @media (max-width: 700px) {
    background-color: transparent;
    width: 40%;
    margin: 0 auto;
    padding-top: 2em;
  }
`;

export const LoginOutButton = styled.button`
  font-size: 0.5em;
  font-weight: 900;
  cursor: pointer;
  border: 0;
  background-color: transparent;
outline: 0;
`;

export const EditToggle = styled.div`
display: flex;
justify-content: center;
align-items: center;
cursor: pointer;
img {
  width: 0.7em;
  height: 1em;
}
`;

export const SidebarInput = styled.input `
background-color: #232b2b;
color: 	#8f9779;
font-size: 0.9em;
border: 0;
outline: none;
padding: 0.3em;
border-bottom: 2px solid;
border-top: 2px solid;
border-color: #071e17;
@media (max-width: 700px) {
  width: 100%;
}
;`

export const ListsWrapper = styled.div`
overflow: scroll;
height: auto;
`;

export const Lists = styled.div`
display: flex;
height: auto;
flex-direction: column;
background-color: #232b2b;
@media (max-width: 700px) {
  height: 100vh;
}
`;

export const List = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
font-size: 0.7em;
padding-left: 0.5em;
padding-right: 0.5em;
cursor: pointer;
word-break: break-word;
background-color: #232b2b;
border-bottom: 2px solid 	#071e17;
color: 	#8f9779;
&.active {
  border-color: #ef3f3f;
  background-color:	#25584f;
  color: #8f9779;
}
`;

export const ListNameWrapper = styled.div`
width: 90%;
text-align: left;
`;

export const DeleteList = styled.div`
visibility: ${props => props.visibility};
opacity: 0.3;
text-shadow: 5px 4px #000;
cursor: pointer;
font-size: 1.5em;
width: 0.7em;
color: indianred;
align-self: right;
transition: all 0.2s ease;
position: relative;
&:hover {
  opacity: 1;
}
@media (max-width: 700px) {
  opacity: 0.6;
  padding-right: 0.5em;
}
`;

export const DeleteDialog = styled.div`
display: flex;
justify-content: space-evenly;
width: 90%;
opacity: 0.5;
#yes {
  color: green;
  cursor: pointer;
}
#no {
  color: red;
  cursor: pointer;
}
`;
