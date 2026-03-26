import React, { useEffect } from "react";
import { useOktaAuth } from "@okta/okta-react";
import { useDispatch, useSelector } from "react-redux";
import { getConfigs } from "../../store/configSlice";
import ConfigTable from "../../components/ConfigTable";
import "./Dashboard.css";

const Dashboard = () => {
  const { authState } = useOktaAuth();
  const dispatch = useDispatch();

  const { data, loading } = useSelector((state) => state.configs);

  useEffect(() => {
    dispatch(getConfigs());
  }, [dispatch]);

  if (!authState?.isAuthenticated) return <div>Loading...</div>;

  return (
    <div className="dashboard-container">

      {/* 👤 Username */}
      <div className="welcome-text">
        Hello,{" "}
        <span className="username">
          {authState.idToken?.claims?.name}
        </span>
      </div>

      {/* 📊 Table Section */}
      <div className="config-section">
        <h2>App Properties</h2>

        {loading ? (
          <p>Loading configs...</p>
        ) : (
          <ConfigTable data={data} />
        )}
      </div>

    </div>
  );
};

export default Dashboard;