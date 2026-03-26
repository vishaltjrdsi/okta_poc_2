import React, { useCallback } from "react";

const ActionCell = ({ data, navigate }) => {
  const handleEdit = useCallback((e) => {
    e.stopPropagation();
    navigate(`/edit/${data.key}`);
  }, [data.key, navigate]);

  return (
    <button className="edit-btn" onClick={handleEdit}>
      Edit
    </button>
  );
};

export default ActionCell;