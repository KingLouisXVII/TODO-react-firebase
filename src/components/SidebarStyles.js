import styled from 'styled-components';

export const StyledSidebar = styled.div`
  background-color: #232b2b;
  border-right: 7px solid #071e17;
  text-align: center;
  height: 100vh;
  overflow-x: hidden;
  overflow-y: scroll;
  @media (max-width: 700px) {
    height: ${props => props.height};
    z-index: 99;   
    border: 0;
    width: 100vw;
  }
`;

export const MobileHamburger = styled.div`
  @media (max-width: 700px) {
    display: flex;
    justify-content: space-between;
    height: 1.5em;
    border: 0;
    padding: 0.5em;
    align-items: center;
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
  }
`;

export const LoginButtons = styled.div`
  background-color: #232b2b;
  border-bottom: 2px solid #071e17;
  display: flex;
  justify-content: space-evenly;
  padding: 1em;
  height: 1em;
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
  border-color: #071e17;
  @media (max-width: 700px) {
    width: 100%;
  }
;`

export const Lists = styled.div`
  display: flex;
  height: auto;
  flex-direction: column;
  background-color: #232b2b;
  @media (max-width: 700px) {
    height: 100vh;
    display: ${props => props.display};
    animation: ${props => props.animation};
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
