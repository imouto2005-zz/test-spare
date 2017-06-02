import React from 'react';

const ActivityItem = ({ activity, id, onClickDelete }) => (
  <p>
    { activity }
    {' '}
    <button id="remove-button" onClick={() => onClickDelete(id)}>
      <i className="em em-negative_squared_cross_mark"></i>
    </button>
  </p>
);


export default ActivityItem;
