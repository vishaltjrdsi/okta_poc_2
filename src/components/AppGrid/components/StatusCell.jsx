import React, { useCallback, useMemo } from "react";
import { useDispatch } from "react-redux";
import { updateStatus } from "../../../slices/appPropertiesSlice";

const StatusCell = ({ data }) => {
  const dispatch = useDispatch();

  const handleToggle = useCallback((e) => {
    e.stopPropagation();
    const newStatus = e.target.checked;
    dispatch(updateStatus({ key: data.key, status: newStatus }));
  }, [data.key, dispatch]);

  const isChecked = useMemo(
    () => data.status === true || data.status === "true",
    [data.status]
  );

  return (
    <div className="status-cell-wrapper" onClick={(e) => e.stopPropagation()}>
      <label className="switch">
        <input
          type="checkbox"
          checked={isChecked}
          onChange={handleToggle}
          aria-label={`Status for ${data.key}`}
        />
        <span className="slider"></span>
      </label>
    </div>
  );
};

export default React.memo(StatusCell);