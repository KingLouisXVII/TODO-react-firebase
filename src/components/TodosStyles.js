import styled from 'styled-components';

export const StyledTodos = styled.div`
  height: 90vh;
  width: 70%;
  margin: 0 auto;
  padding-top: 2em;
  overflow:scroll;
  @media (max-width: 900px) {
    width: 90%;
  }
  @media (max-width: 500px) {
    width: 95%;
  }
`;


export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: sticky;
  top: 0;
    margin: 0;
  @media (max-width: 700px) {
    width: 100%;
    height: 2em;
    justify-content: center;
  }
`;

export const TodosInput = styled.input`
  height: 1.4em;
  width: 90%;
  padding: 0.3em;
  align-self: center;
  word-break: break-word;
  border: 2px solid;
  font-size: 1em;
  align-self: center;
  outline: none;
  background-color: #8f9779;
  color: #071e17;
  border-color: #071e17;
  box-shadow: 5px 5px #071e17;
`;

export const TodosList = styled.ul`
  list-style-type: none;
  flex: 2;
  padding: 0;
  padding-left: 0.9em;
  display: flex;
  flex-direction: column;
  align-items: baseline;
  margin: 0;
  overflow: scroll;
  }
`;

export const TodoItemWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: default !important;
  width: 90%;
  margin-left: 0.8em;
  outline: 0;
  @media (max-width: 800px) {
  margin-left: 0;
  width: 95%;
  }
`;

export const TodosItem = styled.li`
  display: flex;
  justify-content: space-between;
  height: auto;
  width: 100%;
  padding: 0.3em;
  margin: 0.5em;
  cursor: pointer;
  align-self: center;
  word-break: break-word;
  border: 2px solid;
  font-size: 0.7em;
  background-color: #232b2b;
  color: 	#8f9779;
  border-color: ${props => props.color};
  box-shadow: 5px 5px #071e17;
  text-decoration: ${props => props.textDecoration};
  opacity: ${props => props.opacity === true ? '0.5' : '1'};
  animation: ${props => props.animation};
  span {
    width: 70%;
  }
  @media (max-width: 700px) {
    font-size: 0.7em;
    grid-template-columns: 70% 30%;
    span {
      width: 60%;
    }
  }
`;

export const ArchivedTodosItem = styled.li`
  display: flex;
  justify-content: space-between;
  height: auto;
  width: 100%;
  padding: 0.3em;
  margin: 0.3em;
  cursor: pointer;
  align-self: center;
  word-break: break-word;
  border: 2px solid #071e17;
  font-size: 0.7em;
  background-color: #232b2b;
  color: 	#8f9779;
  box-shadow: 5px 5px #071e17;
`;

export const EditTodo = styled.input`
  height: auto;
  width: 100%;
  padding: 0.3em;
  margin: 0.3em;
  border: 2px solid;
  border-color: ${props => props.color};
  font-size: 0.7em;
  background-color: #232b2b;
  color: 	#8f9779;
  box-shadow: 5px 5px #071e17;
  outline: 0;
`;

export const Checkbox = styled.div`
  width: 20px;
  height: 20px;
  margin: 0.1em;
  cursor: pointer;
  text-align: center;
  border: 3px solid #071e17;
  background-color: #232b2b;
  box-shadow: 3px 3px #071e17;
  &.checked {
    background-color: 	#8f9779;
  }
`;
export const TodoButtonsWrapper = styled.div`
  width: 30%;
  display: flex;
  align-self: baseline;
  justify-content: ${props => props.justify?'space-between':'flex-end'}
  height: 1em;
  color: #071e17;
  font-size: 1.3em;
  @media (max-width: 700px) {
    width: 40%;
  }
`;

export const ToggleButtons = styled.div`
  cursor: pointer;
  width: 0.9em;
  padding-left: 0.5em;
`;

export const ImageButton = styled.img`
  cursor: pointer;
  width: 0.9em;
  padding-left: 0.5em;
  opacity: 0.5;
`;

export const ButtonWrapper  = styled.div`
text-align: left;
`;


export const ClearDone = styled.h2`
width: 7em;
  cursor: pointer;
  margin: 0;
  padding: 0.5em;
  font-size: 1em;
  &:hover {
    transition: all 0.5s ease;
    opacity: 0.7;
  }
`;

export const ToggleArchive = styled.h2`
width: 7em;
  margin: 0;
  padding: 0.5em;
  font-size: 1em;
  cursor: pointer;
`;

export const ClearArchive = styled.h2`
width: 7em;
  margin: 0;
  padding: 0.5em;
  font-size: 1em;
  cursor: pointer;
`;

export const ListHeadline = styled.h3`
  display: block;
  width: 70%;
  text-align: center;
`;
