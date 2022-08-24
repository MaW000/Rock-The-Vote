import React from 'react'
import LikeDislikes from './LikeDislikes'
import Comments from './comments'
export default function Issue(props){
    const { title, description, id, userId, handleSort, issues,handleLike, setData} = props
    
    return(
        <div className='issue'>
            <h1>{title}</h1>
            <h2>{description}</h2>
            <LikeDislikes userId={userId}  id={id} issues={issues} setData={setData} handleSort={handleSort} handleLike={handleLike}/>
            <Comments issueId={id} userId={userId} handleSort={handleSort}/>
            <hr style={{border: "1px solid black", width: '500px'}}/>
        </div>
    )
}