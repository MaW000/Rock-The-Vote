import React, { useContext } from 'react'
import IssueList from './components/IssueList.js'
import IssueForm from './components/IssueForm.js'
import { UserContext } from '../../context/UserProvider.js'

export default function Public(){
  const { issues, addIssue, deleteIssue, getIssues } = useContext(UserContext)
  const userId = JSON.parse(localStorage.getItem('user'))._id
  return (
    <div className="public">
      <IssueForm addIssue={addIssue} />
      <div className='issue-list'>
        <h3>Public Issues</h3>
          <IssueList issues={issues} deleteIssue={deleteIssue} userId={userId} getIssues={getIssues} />
      </div>
    </div>
  )
}
