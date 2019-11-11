import React from 'react'

const Item = ({ tweet }) => {
    return (
        <div>
            <p>{`tweet ID: ${tweet.id}`}</p>
            <p>{`tweet userID: ${tweet.userID}`}</p>
            <p>{`tweet content: ${tweet.content}`}</p>
            <p>{`tweet date: ${tweet.date}`}</p>
        </div>
    )

}

export default Item