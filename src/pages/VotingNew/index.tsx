import Main from './main'
import { makeStyles, Container } from '@material-ui/core';
import VotingStakingMenu from './VotingStakingMenu'



const useStyle = makeStyles((theme) => ({
  root: {
    height: '100vh',
    boxSizing: 'border-box',
    margin: '0 7%'
  }
}))

function App() {
  const classes = useStyle()
  return (
    <Container maxWidth="lg">
      <Main />
      <VotingStakingMenu/>
    </Container>
  );
}

export default App;
