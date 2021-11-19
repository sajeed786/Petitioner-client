import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Navbar from './components/Navbar/Navbar';
import Auth from './components/Auth/Auth';
import Activate from './components/Activate/Activate';
import Home from './components/Home/Home';
import PetitionForm from './components/PetitionMultiStep/PetitionForm';
import PetitionReviewPage from './components/PetitionMultiStep/PetitionReviewPage';
//import useStyles from './styles';

const App = () => {
 // const classes = useStyles();

  return(
    <BrowserRouter >
            <Navbar />
            <Switch>
                <Route path='/' exact component={Home}/>
                <Route path='/auth' exact component={Auth}/>
                <Route path='/start-a-petition' exact component={PetitionForm}/>
                <Route path='/petition/review' exact component={PetitionReviewPage} />
                <Route path='/user/activate/:token' exact render={props => <Activate {...props} />} />
            </Switch>
    </BrowserRouter>
  )
}

export default App;
