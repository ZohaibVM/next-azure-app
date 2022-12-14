const Spinner = ({ message, styles }) => {
  return (
    <div
      className="d-flex justify-content-center flex-column align-items-center bg-white w-100"
      style={{
        position: "relative",
        height: "100vh",
        zIndex: 10000,
        ...styles,
      }}
    >
      <span className="spinner"></span>
      {message && <p className="mt-3">{message}</p>}
    </div>
  );
};

export default Spinner;
