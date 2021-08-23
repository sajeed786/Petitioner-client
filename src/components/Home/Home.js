import React from 'react'

import './styles.css'

const Home = () => {

    return (
        <div className="banner-area">
            <div className="content-area">
            {/* <div className="content"> */}
                <h1>Voice for a change</h1>
                
                <p>Victories everyday</p>
                
                <a className="petition-btn" href="/start-a-petition"> Start A Petition </a>
            {/* </div> */}
            </div>
        </div>
    )
}

export default Home