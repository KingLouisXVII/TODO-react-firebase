import styled from 'styled-components';

export const StyledSidebar = styled.div`
  height: 100vh;
    border: 0;
  background-color: #232b2b;
  text-align: center;
  display: flex;
  flex-direction: column;
  @media (max-width: 700px) {
    z-index: 99;   
    width: 100%;
    overflow: hidden;
  }
`;

export const MobileHamburger = styled.div`
  position: fixed;
  top: 0.3em;
  left: 0.3em;
  display: flex;
  justify-content: space-between;
  height: 1.5em;
  border: 0;
  align-items: baseline;
  z-index: 99999;
`;

export const Hamburger = styled.button`
  display: flex;
  padding: 0;
  margin: 0;
  z-index: 99999;
`;

export const Logo = styled.h1`
  font-family: 'Anton', sans-serif;
  margin: 0;
  cursor: pointer;
  opacity: 0.8;
`;

export const ListHeadline = styled.h3`
  position: fixed;
  top: 0;
  right: 0.3em;
  display: block;
  width: 100%;
  margin: 0;
  text-align: center;
background-color: #232b2b;
height: 2em;
`;

export const LoginButtons = styled.div`
  display: flex;
  justify-content: space-evenly;
  padding: 0.5em;
  height: 1em;
  opacity: 0.5;
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
  @keyframes fadeIn {
    from {opacity:0;}
    to {opacity:1;}
  }

  @keyframes fadeOut {
    from {opacity:1;}
    to {opacity:0;}
  }
  @media (max-width: 700px) {
    height: 100vh;
    // animation: ${props => props.animation ? 'fadeIn .4s ease-in' : 'fadeOut .4s forwards'}
  }
`;

export const List = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 0.5em;
  padding-right: 0.5em;
  cursor: pointer;
  word-break: break-word;
  background-color: #232b2b;
  border-bottom: 2px solid 	#071e17;
  color: 	#8f9779;
  font-size: 0.8em;
  &.active {
    border-color: #ef3f3f;
    background-color:	#25584f;
    color: #8f9779;
  }
  &:nth-child(1) {
    border-top: 2px solid #071e17;
  }
  &:active {
    border: 2px solid #071e17;
    cursor: grab;
  }
  &:hover {
    cursor: pointer;
  }
  @media (max-width: 700px) {
    padding-right: 0.5em;
    font-size: 1em;
  }
`;

export const ListNameWrapper = styled.div`
  width: 90%;
  text-align: left;
  cursor: pointer;
`;

export const EditList = styled.input`
  height: auto;
  width: 100%;
background-color: #232b2b;
color: 	#8f9779;
font-size: 0.9em;
border: 0;
outline: none;
padding: 0.3em;
border-bottom: 2px solid #071e17;
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
