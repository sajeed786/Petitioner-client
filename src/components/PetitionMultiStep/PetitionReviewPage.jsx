import React from 'react'
import { useSelector } from 'react-redux'

import { generatePublicUrl } from '../../config/urlConfig'

function PetitionReviewPage() {

    const petitionData = useSelector( state => state.petition.content);

    return (
        <div>
            <h2>{petitionData.petitionTitle}</h2>
            <small>{`in ${petitionData.petitionCategory}`}</small>
            <hr></hr>
            <div>
                <img src={generatePublicUrl(petitionData.supportingMedia)} style={{height: "40vh", width: "40vw"}}/>
            </div>
            <div style={{ marginTop: 10 }}>
                <div dangerouslySetInnerHTML={{ __html: petitionData.problemDetail }} />
            </div>
        </div>
    )
}

export default PetitionReviewPage
