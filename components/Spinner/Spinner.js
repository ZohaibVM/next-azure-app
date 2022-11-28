const Spinner = ({ message }) => {
  return (
    <div
      className="d-flex justify-content-center flex-column align-items-center position-relative bg-white"
      style={{ height: "100vh", zIndex: 10000 }}
    >
      <span className="spinner"></span>
      {message && <p className="mt-3">{message}</p>}
    </div>
  );
};

export default Spinner;
