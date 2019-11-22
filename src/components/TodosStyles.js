import styled from 'styled-components';

export const StyledTodos = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  @media (max-width: 700px) {
    height: 100%;
  }
`;

export const ListHeadline = styled.h6`
  display: none;
  margin: 0;
  text-align: center;
  margin-top: 1.5em;
  @media (max-width: 700px) {
    display: block;
  }
`;

export const InputWrapper = styled.div`
  display: flex;
  position: sticky;
  top: 0;
  z-index: 99;
  @media (max-width: 700px) {
    width: 100%;
    margin: 0;
    height: 2em;
    justify-content: center;
    top: 2em;
  }
`;

export const TodosInput = styled.input`
  height: auto;
  width: 100%;
  padding: 0.3em;
  margin-top: 1em;
  margin-left: 1em;
  margin-right: 1em;
  align-self: center;
  word-break: break-word;
  border: 2px solid;
  font-size: 1em;
  align-self: center;
  outline: none;
  background-color: #8f9779;
  color: 	#071e17;
  border-color: #071e17;
  box-shadow: 5px 5px #071e17;
@media (max-width: 700px) {
  width: 85%;
  margin: 0;
}
`;

export const TodosList = styled.ul`
list-style-type: none;
margin: 0;
overflow: scroll;
flex: 2;
padding: 0;
display: flex;
flex-direction: column;
align-items: center;
@media (max-width: 700px) {
  width: 100%;
  padding: 0;
}
`;

export const TodoItemWrapper = styled.div`
display: flex;
flex-direction: row;
align-items: center;
cursor: default !important;
width: 90%;
margin-left: 0.8em;
`;

export const TodosItem = styled.li`
display: flex;
justify-content: space-between;
height: auto;
width: 100%;
padding: 0.2em;
margin: 0.5em;
cursor: pointer;
align-self: center;
word-break: break-word;
border: 2px solid;
font-size: 0.7em;
background-color: #232b2b;
color: 	#8f9779;
border-color: ${props => props.color};
box-shadow: 5px 5px ${props => props.color};
text-decoration: ${props => props.textDecoration};
opacity: ${props => props.opacity};
animation: ${props => props.animation};
@media (max-width: 700px) {
  font-size: 0.7em;
}
`;

export const Checkbox = styled.div`
width: 20px;
height: 20px;
margin: 0.1em;
cursor: pointer;
text-align: center;
border: 3px solid #071e17;
background-color: #232b2b;
box-shadow: 3px 3px 	#071e17;
&.checked {
  background-color: 	#8f9779;
}
`;
export const ButtonsWrapper = styled.div`
display: flex;
align-self: baseline;
height: 1em;
`;

export const ImageButton = styled.img`
cursor: pointer;
width: 0.9em;
opacity: 0.3;
padding-left: 0.5em;
`;

export const ClearDone = styled.h2`
cursor: pointer;
margin: 0;
text-align: center;
&:hover {
  transition: all 0.5s ease;
  opacity: 0.7;
}
`;

