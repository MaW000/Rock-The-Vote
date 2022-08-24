/* eslint-disable array-callback-return */
import React, { useEffect, useState,useContext } from 'react'
import { LikeFilled, LikeOutlined, DislikeFilled, DislikeOutlined } from '@ant-design/icons'
import { Tooltip } from 'antd';
import { UserContext } from '../../../context/UserProvider.js'

export default function LikeDislikes(props) {
    const [Likes, setLikes] = useState(0)
    const [Dislikes, setDislikes] = useState(0)
    const [LikeAction, setLikeAction] = useState(null)
    const [DislikeAction, setDislikeAction] = useState(null)
    const { userAxios } = useContext(UserContext)
    const userId = JSON.parse(localStorage.getItem('user'))._id
    const {handleSort} = props
    let variable = {}
    console.log(props)
    if(props.commentId){
        variable = { userId: userId, commentId: props.commentId, }
    } else {
        variable = { userId: userId, issueId: props.id, }
    }
    
    

    useEffect(() => {
        userAxios.post('/api/like/getLikes', variable)
            .then(res => {
                if (res.data.success){
                    setLikes(res.data.likes.length)
                    
                    res.data.likes.map((like) => {
                        if (like.userId === userId) {
                            return setLikeAction('liked')
                        }
                    })
                } else {
                    console.log('Failed to get likes')
                }
            })
        userAxios.post('/api/like/getDislikes', variable)
            .then(response => {
                if (response.data.success) {
                    setDislikes(response.data.dislikes.length)

                    response.data.dislikes.map(dislike => {
                        if (dislike.userId === props.userId) {
                            setDislikeAction('disliked')
                        }
                    })
                } else {
                    alert('Failed to get Dislikes')
                }
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    
    const onLike = () => {            
        if(LikeAction === null){
            userAxios.post('/api/like/upLike', variable)
                .then(res => {
                    if(res.data.success){
                        
                        setLikes(Likes + 1)
                        setLikeAction('liked')
                        
                        

                        if(DislikeAction !== null) {
                            setDislikeAction(null)
                            setDislikes(Dislikes - 1)
                        }

                        userAxios.post(`/api/issue/likes/${props.id}`, {likes: Likes + 1})
                        .then(res => {
                            if (res.data) {
                                
                                handleSort()
                            } else {
                                console.log('Failed to add likes')
                                console.log(res)
                            }
                    })
                    } else {
                        alert('Failed to increase like')
                    }
                })
        } else {
            userAxios.post('/api/like/unLike',variable)
                .then(res => {
                    if (res.data.success){
                        setLikes(Likes - 1)
                        setLikeAction(null)
                        userAxios.post(`/api/issue/likes/${props.id}`, {likes: Likes - 1})
                        .then(res => {
                            if (res.data) {
                                handleSort()
                            } else {
                                console.log('Failed to add likes')
                                console.log(res)
                            }
                        })
                    } else {
                        alert('failed to decrease the like')
                    }
                })
        }
    }

    const onDisLike = () => {
        if (DislikeAction !== null) {

            userAxios.post('/api/like/upDisLike', variable)
                .then(response => {
                    if (response.data.success) {

                        setDislikes(Dislikes - 1)
                        setDislikeAction(null)

                    } else {
                        alert('Failed to decrease dislike')
                    }
                })

        } else {

            userAxios.post('/api/like/upDisLike', variable)
                .then(response => {
                    if (response.data.success) {

                        setDislikes(Dislikes + 1)
                        setDislikeAction('disliked')

                        if(LikeAction !== null ) {
                            setLikeAction(null)
                            setLikes(Likes - 1)
                        }

                    } else {
                        alert('Failed to increase dislike')
                    }
                })
        }
        
    }

    return (
        <>
            <span>
                <Tooltip>
                    {LikeAction === 'liked' ? <LikeFilled onClick={onLike}></LikeFilled> : <LikeOutlined onClick={onLike}></LikeOutlined>}
                </Tooltip>
                <span>{Likes}</span>
            </span>&nbsp;&nbsp;
            <span>
                <Tooltip>
                    {DislikeAction === 'disliked' ? <DislikeFilled onClick={onDisLike}></DislikeFilled> : <DislikeOutlined onClick={onDisLike}></DislikeOutlined>}
                </Tooltip>
                <span>{Dislikes}</span>
            </span>
        </>
    )
}
