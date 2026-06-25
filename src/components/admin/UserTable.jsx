import Badge from "../common/Badge";
import Button from "../common/Button";
import Table from "../common/Table";
import { formatDateTime } from "../../utils/formatDate";
import { getRoleLabel } from "../../utils/roleUtils";

const UserTable = ({
  users = [],
  loading = false,
  onToggleStatus,
}) => {
  const columns = [
    { key: "fullName", title: "Ad Soyad" },
    { key: "email", title: "E-posta" },
    {
      key: "emailVerified",
      title: "Doğrulama",
      render: (val) => (
        <Badge
          label={val ? "Doğrulandı" : "Doğrulanmadı"}
          colorClass={val ? "badge--paid" : "badge--pending"}
        />
      ),
    },
    { key: "phoneNumber", title: "Telefon", render: (v) => v || "—" },
    {
      key: "role",
      title: "Rol",
      render: (val) => getRoleLabel(val),
    },
    {
      key: "isActive",
      title: "Durum",
      render: (val) => (
        <Badge
          label={val ? "Aktif" : "Pasif"}
          colorClass={val ? "badge--active" : "badge--cancelled"}
        />
      ),
    },
    {
      key: "createdAt",
      title: "Kayıt Tarihi",
      render: (val) => formatDateTime(val),
    },
    {
      key: "id",
      title: "İşlem",
      render: (_, row) => (
        <Button
          variant={row.isActive ? "danger" : "primary"}
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            onToggleStatus(row);
          }}
        >
          {row.isActive ? "Pasifleştir" : "Aktifleştir"}
        </Button>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      data={users}
      loading={loading}
      emptyTitle="Kullanıcı bulunamadı"
      emptyIcon="👥"
    />
  );
};

export default UserTable;
