import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import { useDispatch } from 'react-redux';
import { useHistory} from 'react-router-dom';
import { Link, Redirect } from 'react-router-dom';
import { activate } from '../../actions/auth';
import { activateAcc } from '../../api/index';
import './styles.css';

const Activate = ({ match }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    token: '',
    show: true
  });
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    let token = match.params.token;
    let { firstName } = jwt.decode(token);

    if (token) {
      setFormData({ ...formData, firstName, token });
    }

  }, [match.params]);

  const { firstName, token } = formData;

  const handleSubmit = async(e) => {
    e.preventDefault();

    try {
      const {data} = await activateAcc(token);
        //console.log(data);
      dispatch({ type: 'ACTIVATE', data});
    
      setFormData({
        ...formData,
        show: false
      });

    } catch (error) {
      console.log(error.message);
      toast.error(error.response.data.message);
    }
    
  };

  return (
    <div className="bgGray">
      <ToastContainer />
          <div className='containerButtons'>
            <h1 className='welcomeText'>
              Welcome {firstName}
            </h1>

            <form className='formBox' onSubmit={handleSubmit} >
              <div className='actAccount'>
                <button
                  type='submit'
                  className='activate'>
                  <i className='fas fa-user-plus'/>
                  <span>Activate</span>
                </button>
              </div>

              { formData.show ? (
                  <div className='bodyText'>
                      Or sign up again
                  </div> ) : ( <div className='bodyText'>
                                    Please Login
                                </div>
              )}

              <div className='signup'>
                <a
                  className='link'
                  href='/auth'
                  target='_self'
                >
                  <i className='fas fa-sign-in-alt fa 1x'/>
                  { formData.show ? (
                      <span>
                        Sign Up
                      </span> ) : ( <span>
                                      Log In
                                    </span>
                  )}
                  
                </a>
              </div>
            </form>
          </div>
    </div>
  );
};

export default Activate;