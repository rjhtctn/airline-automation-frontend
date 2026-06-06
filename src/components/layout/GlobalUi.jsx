import useUiStore from "../../store/uiStore";
import Modal from "../common/Modal";
import ConfirmDialog from "../common/ConfirmDialog";
import Loader from "../common/Loader";

const GlobalUi = () => {
  const {
    globalLoading,
    modal,
    closeModal,
    confirmDialog,
    closeConfirmDialog,
    setConfirmLoading,
  } = useUiStore();

  const handleConfirm = async () => {
    if (!confirmDialog.onConfirm) {
      closeConfirmDialog();
      return;
    }

    setConfirmLoading(true);
    try {
      await confirmDialog.onConfirm();
      closeConfirmDialog();
    } catch {
      setConfirmLoading(false);
    }
  };

  return (
    <>
      {globalLoading && (
        <div className="global-loader">
          <Loader text="İşlem yapılıyor..." />
        </div>
      )}

      <Modal
        open={modal.open}
        onClose={closeModal}
        title={modal.title}
      >
        {modal.content}
      </Modal>

      <ConfirmDialog
        open={confirmDialog.open}
        title={confirmDialog.title}
        message={confirmDialog.message}
        confirmText={confirmDialog.confirmText}
        cancelText={confirmDialog.cancelText}
        variant={confirmDialog.variant}
        loading={confirmDialog.loading}
        onConfirm={handleConfirm}
        onCancel={closeConfirmDialog}
      />
    </>
  );
};

export default GlobalUi;
