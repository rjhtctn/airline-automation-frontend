import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Plus } from "lucide-react";
import useAdmin from "../../../hooks/useAdmin";
import useUiStore from "../../../store/uiStore";
import UserTable from "../../../components/admin/UserTable";
import AdminCreateForm from "../../../components/admin/AdminCreateForm";
import ErrorMessage from "../../../components/common/ErrorMessage";
import Button from "../../../components/common/Button";
import Modal from "../../../components/common/Modal";

const AdminUsersPage = () => {
  const { getUsers, createAdmin, updateUserStatus, loading, error, setError } =
    useAdmin();
  const openConfirmDialog = useUiStore((s) => s.openConfirmDialog);
  const [users, setUsers] = useState([]);
  const [createOpen, setCreateOpen] = useState(false);

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

  const handleCreateAdmin = async (payload) => {
    await createAdmin(payload);
    toast.success("Admin kullanıcı oluşturuldu.");
    setCreateOpen(false);
    await fetchUsers();
  };

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
        <Button
          variant="accent"
          onClick={() => {
            setError(null);
            setCreateOpen(true);
          }}
        >
          <Plus size={16} />
          Yeni Admin
        </Button>
      </div>

      {error && <ErrorMessage message={error} />}

      <div className="card card--elevated">
        <UserTable
          users={users}
          loading={loading}
          onToggleStatus={handleToggleStatus}
        />
      </div>

      <Modal
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        title="Yeni Admin Oluştur"
        size="lg"
      >
        <AdminCreateForm
          onSubmit={handleCreateAdmin}
          loading={loading}
          error={error}
        />
      </Modal>
    </div>
  );
};

export default AdminUsersPage;
