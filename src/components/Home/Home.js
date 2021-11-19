import {React, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
//import { toast } from 'react-toastify';

//import { checkUser } from '../../actions/auth';

import './styles.css'

const Home = () => {
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
    //const msg = useSelector(state => state.auth.authMessage);
    //const dispatch = useDispatch();
    const history = useHistory();

    const handlePetitionClick = () => {
        if(isLoggedIn)
            history.push('/start-a-petition');
        else
            history.push('/auth');
    }

    return (
        <div className="banner-area">
            <div className="content-area">
                <h1>Voice for a change</h1>
                
                <p>Victories everyday</p>
                
                <button className="petition-btn" onClick={handlePetitionClick}> Start A Petition </button>
            </div>
        </div>
    )
}

export default Home