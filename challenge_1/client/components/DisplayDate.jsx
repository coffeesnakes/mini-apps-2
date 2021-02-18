import React from 'react';

const DisplayDate = ({ date }) => {
  const dateChecker = () => {
    let dateArr = date.split("/");
    let newDate;
    if (dateArr.length === 1) {
      newDate = `${dateArr[0].slice(1)} BCE`;
    } else if (dateArr[0].length === 3) {
      newDate = `${dateArr[1]}/${dateArr[2]}/${dateArr[0]} BCE`;
    } else {
      newDate = `${dateArr[1]}/${dateArr[2]}/${dateArr[0]} CE`;
    }
    return <p>Date - {newDate}</p>;
  };

  return <div>{dateChecker()}</div>;
};

export default DisplayDate;
