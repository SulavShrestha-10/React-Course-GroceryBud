import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
const List = ({ items, clearItems, removeItem, checkItem, editItem }) => {
  return (
    <div className="items">
      {items.map((data) => {
        const { id, item, completed } = data;
        return (
          <div key={id} className="single-item">
            <input
              type="checkbox"
              checked={completed}
              onChange={() => checkItem(id)}
            />
            <p
              style={{
                textTransform: "capitalize",
                textDecoration: completed && "line-through",
              }}
            >
              {item}
            </p>
            <button className="btn" type="button" onClick={() => editItem(id)}>
              <FaEdit />
            </button>
            <button
              onClick={() => removeItem(id)}
              className="btn remove-btn"
              type="button"
            >
              <FaTrash />
            </button>
          </div>
        );
      })}
      <button type="button" onClick={clearItems} className="btn remove-btn">
        Clear Items
      </button>
    </div>
  );
};

export default List;
