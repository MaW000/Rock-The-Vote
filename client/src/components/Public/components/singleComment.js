import React from 'react'
import LikeDislikes from './LikeDislikes.js';
export default function SingleComment(props){
    
    return (
        <div>
            <p><span style={{fontWeight: '500', fontSize: '18px'}}>{props.comment.writer.username}</span>: {props.comment.content}</p>
            <LikeDislikes comment={props.comment} commentId={props.comment._id} userId={JSON.parse(localStorage.getItem('user'))._id}/>
        </div>
    )
}