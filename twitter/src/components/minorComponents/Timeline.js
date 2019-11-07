import React from 'react'
import Item from './Item'

//Component for displaying tweets
const Timeline = ({ tweets }) => {
    const getAllItems = () => 
        tweets.map(tweet =>
            <li>
                <Item tweet={tweet} />
             </li>   
        ) 
    return (
        <ul>
            {getAllItems()}
        </ul>
    )

}

export default Timeline