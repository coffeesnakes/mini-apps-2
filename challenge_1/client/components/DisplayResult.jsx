import React from 'react';
import DisplayDate from './DisplayDate.jsx';

const DisplayResult = ({ record }) => {
  const categoryChecker = () => {
    if (record.category2 === undefined) {
      return;
    }
    return <p>{record.category1}: {record.category2}</p>
  }

  return (
    <div>
      <DisplayDate date={record.date} />
      <p> {record.description}</p>
      {categoryChecker()}
    </div>
  )
}

export default DisplayResult;
