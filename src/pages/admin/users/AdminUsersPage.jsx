import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useAdmin from "../../../hooks/useAdmin";
import useUiStore from "../../../store/uiStore";
import UserTable from "../../../components/admin/UserTable";
import ErrorMessage from "../../../components/common/ErrorMessage";

const AdminUsersPage = () => {
  const { getUsers, updateUserStatus, loading, error } = useAdmin();
  const openConfirmDialog = useUiStore((s) => s.openConfirmDialog);
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const data = await getUsers();
      setUsers(data);
    } catch {
      // Hata hook'ta
    }
  };

  useEffect(() => {
    fetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleToggleStatus = (user) => {
    const newStatus = !user.isActive;
    openConfirmDialog({
      title: newStatus ? "Kullanıcıyı Aktifleştir" : "Kullanıcıyı Pasifleştir",
      message: `${user.fullName} kullanıcısını ${newStatus ? "aktif" : "pasif"} yapmak istediğinize emin misiniz?`,
      confirmText: "Onayla",
      variant: newStatus ? "primary" : "danger",
      onConfirm: async () => {
        await updateUserStatus(user.id, newStatus);
        toast.success(
          `Kullanıcı ${newStatus ? "aktifleştirildi" : "pasifleştirildi"}.`
        );
        await fetchUsers();
      },
    });
  };

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Kullanıcı Yönetimi</h1>
          <p className="page-subtitle">
            Sistemdeki kullanıcıları görüntüleyin ve yönetin
          </p>
        </div>
      </div>

      {error && <ErrorMessage message={error} />}

      <div className="card card--elevated">
        <UserTable
          users={users}
          loading={loading}
          onToggleStatus={handleToggleStatus}
        />
      </div>
    </div>
  );
};

export default AdminUsersPage;
