import React from 'react';

const FoodItem = ({ food, cuisine, place, id, onClickDelete }) => (
  <p>
    { food }

    { cuisine && <p>Cuisine: { cuisine } </p> }

    { place && <p>Type of place: { place }</p>}

    <button id="remove-button" onClick={() => onClickDelete(id)}>
    <i className="em em-negative_squared_cross_mark"></i>
    </button>
  </p>
)
export default FoodItem;
