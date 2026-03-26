import React, { useState, useCallback, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateProperty, selectPropertyByKey } from "../../slices/appPropertiesSlice";
import useFormValidation from "../../hooks/useFormValidation";
import "./EditPage.css";

const validate = (values) => {
  const errors = {};
  
  if (!values.type || String(values.type).trim() === "") {
    errors.type = "Type is required";
  }
  
  if (!values.value || String(values.value).trim() === "") {
    errors.value = "Value is required";
  }
  
  if (!values.groupName || String(values.groupName).trim() === "") {
    errors.groupName = "Group is required";
  }
  
  if (values.description && String(values.description).length > 500) {
    errors.description = "Description cannot exceed 500 characters";
  }
  
  return errors;
};

function EditPage() {
  const { key } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const property = useSelector((state) =>
    selectPropertyByKey(state, key)
  );

  const {
    values: form,
    errors,
    touched,
    handleChange,
    handleBlur,
    setValues,
  } = useFormValidation(property || {}, validate);

  React.useEffect(() => {
    if (property && Object.keys(property).length > 0) {
      setValues(property);
    }
  }, [property, setValues]);

  const handleStatusChange = useCallback((e) => {
    handleChange({
      target: {
        name: "status",
        value: e.target.value === "true",
      },
    });
  }, [handleChange]);

  const handleSave = useCallback(() => {
    const validationErrors = validate(form);
    
    if (Object.keys(validationErrors).length === 0 && Object.keys(form).length > 0) {
      dispatch(updateProperty(form));
      navigate("/dashboard");
    }
  }, [dispatch, form, navigate]);

  const hasProperty = property && Object.keys(property).length > 0;

  if (!hasProperty) {
    return (
      <div className="editpage-container">
        <div className="editpage-card">
          <h2 className="editpage-title">Property not found</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="editpage-container">
      <div className="editpage-card">
        <h2 className="editpage-title">Edit Property: {key}</h2>

        <div className="editpage-form-group">
          <label className="editpage-label">Type</label>
          <input
            name="type"
            value={form.type || ""}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`editpage-input ${touched.type && errors.type ? "error" : ""}`}
          />
          {touched.type && errors.type && (
            <span className="editpage-error">{errors.type}</span>
          )}
        </div>

        <div className="editpage-form-group">
          <label className="editpage-label">Value</label>
          <input
            name="value"
            value={form.value || ""}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`editpage-input ${touched.value && errors.value ? "error" : ""}`}
          />
          {touched.value && errors.value && (
            <span className="editpage-error">{errors.value}</span>
          )}
        </div>

        <div className="editpage-form-group">
          <label className="editpage-label">Default Value</label>
          <input
            name="defaultValue"
            value={form.defaultValue || ""}
            onChange={handleChange}
            onBlur={handleBlur}
            className="editpage-input"
          />
        </div>

        <div className="editpage-form-group">
          <label className="editpage-label">Group</label>
          <input
            name="groupName"
            value={form.groupName || ""}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`editpage-input ${touched.groupName && errors.groupName ? "error" : ""}`}
          />
          {touched.groupName && errors.groupName && (
            <span className="editpage-error">{errors.groupName}</span>
          )}
        </div>

        <div className="editpage-form-group">
          <label className="editpage-label">Description</label>
          <textarea
            name="description"
            value={form.description || ""}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`editpage-textarea ${touched.description && errors.description ? "error" : ""}`}
          />
          {touched.description && errors.description && (
            <span className="editpage-error">{errors.description}</span>
          )}
        </div>

        <div className="editpage-form-group">
          <label className="editpage-label">Status</label>
          <select
            name="status"
            value={form.status === true ? "true" : "false"}
            onChange={handleStatusChange}
            onBlur={handleBlur}
            className="editpage-select"
          >
            <option value="true">True</option>
            <option value="false">False</option>
          </select>
        </div>

        <button className="editpage-save-button" onClick={handleSave}>
          Save Changes
        </button>
      </div>
    </div>
  );
}

export default React.memo(EditPage);