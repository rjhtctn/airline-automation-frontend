import Input from "../common/Input";
import Button from "../common/Button";

const ReportFilter = ({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
  onSubmit,
  loading = false,
  error = null,
}) => {
  return (
    <form
      className="report-filter"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit?.();
      }}
      noValidate
    >
      <div className="report-filter__fields">
        <Input
          label="Başlangıç Tarihi"
          name="startDate"
          type="date"
          value={startDate}
          onChange={onStartDateChange}
          required
        />
        <Input
          label="Bitiş Tarihi"
          name="endDate"
          type="date"
          value={endDate}
          onChange={onEndDateChange}
          required
        />
        <div className="report-filter__action">
          <Button type="submit" variant="accent" loading={loading}>
            Raporu Getir
          </Button>
        </div>
      </div>
      {error && <p className="report-filter__error">{error}</p>}
    </form>
  );
};

export default ReportFilter;
