const DashboardCard = ({ icon, label, value, accent = false }) => {
  return (
    <div className={`dashboard-card card ${accent ? "dashboard-card--accent" : ""}`}>
      <div className="dashboard-card__icon">{icon}</div>
      <div className="dashboard-card__content">
        <span className="dashboard-card__label">{label}</span>
        <span className="dashboard-card__value">{value}</span>
      </div>
    </div>
  );
};

export default DashboardCard;
