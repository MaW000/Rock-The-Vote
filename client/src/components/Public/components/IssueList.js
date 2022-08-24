import React, {useEffect, useState, useMemo} from 'react'

import Issue from './Issue.js'

export default function IssueList(props){
    const { issues, deleteIssue, likeIssue, userId, getIssues } = props
    
    const [data, setData] = useState(issues);
    
    useEffect(() => {
        handleSort()
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    console.log(props)
    function handleSort() {
        getIssues();
        setData(issues)
        const sortedData = [...data].sort((a,b) => {
            return a.likes < b.likes ? 1 : -1
        })
        setData(sortedData)
        console.log(sortedData)
        console.log()
    }
    
    return (
        <div className='issue-list'>
            { data.map(issue => <Issue {...issue} issues={issues} setData={setData} handleSort={handleSort} userId={userId} likeIssue={likeIssue} deleteIssue={deleteIssue} id={issue._id} key={issue._id}/>)}
        </div>
    )
}