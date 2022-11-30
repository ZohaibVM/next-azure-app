import { sortableHandle } from "react-sortable-hoc";

const DragHandle = sortableHandle(() => (
  <span className="mr-2" style={{ cursor: "grab" }}>
    <i
      className="fa fa-bars"
      aria-hidden="true"
      style={{ fontSize: "1.2em" }}
    ></i>
  </span>
));

export default DragHandle;
