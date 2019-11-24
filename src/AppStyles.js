
import styled from 'styled-components';

const AppContainer = styled.div`
  font-family: 'Anton', sans-serif;
  display: grid;
  grid-template-columns: 25% 60% auto;
  width: 100vw;
  height: 100vh;
  background-color:	#232b2b;
  color: 	#8f9779;
  overflow: hidden;
  @media (max-width: 700px) {
    display: grid;
    grid-template-columns: 100%;
    grid-template-rows: 7% 90%;
    border: 0;
    box-shadow: none;
    overflow: hidden;
  }
`;

export default AppContainer;
