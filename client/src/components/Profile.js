import React, { useContext } from 'react'
import IssueList from './Public/components/IssueList.js'
import { UserContext } from '../context/UserProvider.js'

export default function Profile(){
  const { user: { username }, userIssues, getIssues} = useContext(UserContext)
  
  return (
    <div className="profile">
      <h1>Welcome @{username}</h1>
      <h3>Your Todos</h3>
      <IssueList issues={userIssues.userIssues} getIssues={getIssues}/>
    </div>
  )
}