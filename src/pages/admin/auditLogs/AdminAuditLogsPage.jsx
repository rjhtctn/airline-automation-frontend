import { useEffect, useState } from "react";
import auditLogApi from "../../../api/auditLogApi";
import Table from "../../../components/common/Table";
import Loader from "../../../components/common/Loader";
import ErrorMessage from "../../../components/common/ErrorMessage";
import Modal from "../../../components/common/Modal";
import Button from "../../../components/common/Button";
import { formatDateTime } from "../../../utils/formatDate";

const AdminAuditLogsPage = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedLog, setSelectedLog] = useState(null);

  useEffect(() => {
    auditLogApi
      .getAll()
      .then((res) => setLogs(res.data.data || []))
      .catch((err) =>
        setError(err.response?.data?.message || "Audit loglar yüklenemedi.")
      )
      .finally(() => setLoading(false));
  }, []);

  const columns = [
    { key: "id", title: "ID", width: "60px" },
    { key: "adminFullName", title: "Admin" },
    { key: "action", title: "İşlem" },
    { key: "entityName", title: "Varlık" },
    { key: "entityId", title: "Varlık ID" },
    {
      key: "createdAt",
      title: "Tarih",
      render: (val) => formatDateTime(val),
    },
    {
      key: "id",
      title: "Detay",
      render: (_, row) => (
        <Button
          variant="outline"
          size="sm"
          onClick={() => setSelectedLog(row)}
        >
          Görüntüle
        </Button>
      ),
    },
  ];

  if (loading && !logs.length) {
    return <Loader text="Audit loglar yükleniyor..." />;
  }

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Audit Log</h1>
          <p className="page-subtitle">Admin işlem geçmişi</p>
        </div>
      </div>

      {error && <ErrorMessage message={error} />}

      <div className="card card--elevated">
        <Table
          columns={columns}
          data={logs}
          loading={loading}
          emptyTitle="Kayıt bulunamadı"
          emptyIcon="📜"
        />
      </div>

      <Modal
        open={!!selectedLog}
        onClose={() => setSelectedLog(null)}
        title="Audit Log Detayı"
        size="lg"
      >
        {selectedLog && (
          <div className="audit-log-detail">
            <div className="audit-log-detail__row">
              <span className="audit-log-detail__label">Admin</span>
              <span>{selectedLog.adminFullName}</span>
            </div>
            <div className="audit-log-detail__row">
              <span className="audit-log-detail__label">İşlem</span>
              <span>{selectedLog.action}</span>
            </div>
            <div className="audit-log-detail__row">
              <span className="audit-log-detail__label">Varlık</span>
              <span>
                {selectedLog.entityName} (#{selectedLog.entityId})
              </span>
            </div>
            <div className="audit-log-detail__row">
              <span className="audit-log-detail__label">Tarih</span>
              <span>{formatDateTime(selectedLog.createdAt)}</span>
            </div>
            {selectedLog.oldValue && (
              <div className="audit-log-detail__json">
                <span className="audit-log-detail__label">Eski Değer</span>
                <pre>{JSON.stringify(selectedLog.oldValue, null, 2)}</pre>
              </div>
            )}
            {selectedLog.newValue && (
              <div className="audit-log-detail__json">
                <span className="audit-log-detail__label">Yeni Değer</span>
                <pre>{JSON.stringify(selectedLog.newValue, null, 2)}</pre>
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
};

export default AdminAuditLogsPage;
