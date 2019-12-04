import styled from 'styled-components';

export const StyledTodos = styled.div`
  height: 95vh;
  margin-top: 1em;
  overflow-x: hidden;
  overflow-y: scroll;
  @media (max-width: 700px) {
    height: 90vh;
    overflow:scroll;
    margin-top: 0.3em;
  }
`;


export const InputWrapper = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  position: sticky;
  top: 0;
  @media (max-width: 700px) {
    width: 100%;
    margin: 0;
    height: 2em;
    justify-content: center;
  }
`;

export const TodosInput = styled.input`
  height: 1.4em;
  width: 95%;
  padding: 0.3em;
  margin-left: 0.4em;
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
  width: 90%;
  list-style-type: none;
  flex: 2;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: baseline;
  margin: 0;
  @media (max-width: 700px) {
    width: 100%;
    padding: 0;
    align-items: center;
    overflow: scroll;
    height: initial;
  }
`;

export const TodoItemWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: default !important;
  width: 92%;
  margin-left: 0.8em;
  @media (max-width: 700px) {
    width: 90%;
    margin-left: 0;
  }
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
  padding-left: 0.5em;
`;

export const ClearDone = styled.h2`
  position: fixed;
  bottom: 0;
  right: 0;
  cursor: pointer;
  margin: 0;
  font-size: 1em;
  text-align: center;
  &:hover {
    transition: all 0.5s ease;
    opacity: 0.7;
  }
`;

