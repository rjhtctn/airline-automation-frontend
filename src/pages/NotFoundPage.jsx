import { Link } from "react-router-dom";
import EmptyState from "../components/common/EmptyState";
import ROUTES from "../constants/routes";
import Button from "../components/common/Button";

const NotFoundPage = () => {
  return (
    <div className="page" style={{ paddingTop: "var(--space-16)" }}>
      <EmptyState
        icon="🔍"
        title="Sayfa bulunamadı"
        text="Aradığınız sayfa mevcut değil veya taşınmış olabilir."
      >
        <Link to={ROUTES.HOME}>
          <Button variant="primary">Ana Sayfaya Dön</Button>
        </Link>
      </EmptyState>
    </div>
  );
};

export default NotFoundPage;
