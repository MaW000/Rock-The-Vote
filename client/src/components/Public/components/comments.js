import React, { useContext,useState , useEffect } from 'react'
import { UserContext } from '../../../context/UserProvider.js'
import SingleComment from './singleComment.js'

function Comments(props) {
    const { userAxios } = useContext(UserContext)
    const [commentLists, setCommentLists] = useState([])
    const [showComments, setShowComments] = useState(true)
    const [commentValue, setCommentValue] = useState('')
    const variable = {issueId: props.issueId}
    const userId = JSON.parse(localStorage.getItem('user'))._id
    useEffect(() => {
        
        userAxios.post('/api/comment/getComments', variable)
            .then(response => {
                if (response.data.success) {
                    setCommentLists(response.data.comments)
                } else {
                    alert('Failed to get video Info')
                }
            })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleChange = (e) => {
        setCommentValue(e.currentTarget.value)
        props.handleSort()
    }
    
    const onSubmit = (e) => {
        e.preventDefault();
        const variables = {
            content: commentValue,
            writer: userId,
            issueId: props.issueId
        }
        userAxios.post('/api/comment/saveComment', variables)
            .then(res => {
                if(res.data.success) {
                    setCommentValue('')
                } else {
                    alert('Failed to save Comment')
                }
            })
    }

  return (
    <>  
        {showComments ? <p onClick={() => {setShowComments(!showComments)}} style={{cursor: 'pointer'}}>Show Comments</p>: 
            <div>
                <p onClick={() => setShowComments(!showComments)} style={{cursor: 'pointer'}}>Close Comments</p>
                <form onSubmit={onSubmit}>
                    <input
                        style={{ borderRadius: '5px'}}
                        onChange={handleChange}
                        value={commentValue}
                        placeholder='write your comment' 
                    />
                    <br/>
                    <button>Post Comment</button>
                </form>
                { commentLists && <h3>Comments</h3> }
                { commentLists.map((comment) => (<SingleComment comment={comment} issueId={props.issueId} key={comment._id}/>)) }
                
                
            </div>
        }
    </>
  )
}

export default Comments