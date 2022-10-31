import Drawer from "../shared/Drawer";
import useTheme from "../hooks/useTheme";

const LeftDrawer = ({ isOpen, onClose }) => {
  const {
    selectedTheme,
    setSelectedTheme,
    activeTheme,
    setActiveTheme,
    themeOptions,
  } = useTheme();

  const {
    secondaryColor,
    fontColor,
    inputBgColor,
    formBgColor,
    pageBgColor,
    formWidth,
    labelAlignment,
  } = selectedTheme;

  const handleLayout = (layout) => {
    setSelectedTheme(layout);
    setActiveTheme(layout.name);
  };

  return (
    <Drawer left isOpen={isOpen} onClose={onClose}>
      <p>Color Scheme</p>
      <div className="drawer-layout">
        {themeOptions.map((layout) => (
          <button
            style={{
              borderColor: layout.name === activeTheme ? secondaryColor : "",
            }}
            key={layout.name}
            onClick={() => handleLayout(layout)}
          >
            <span
              style={{
                backgroundColor: layout.themeColor,
                color: layout.textColor,
              }}
            >
              A
            </span>
          </button>
        ))}
      </div>
      <div className="drawer-options">
        <div className="drawer-input">
          <label>Page Color</label>
          <div className="color-input">
            <input
              name="pageColorHex"
              type="text"
              value={pageBgColor}
              onChange={({ target: { value } }) =>
                setSelectedTheme({ ...selectedTheme, pageBgColor: value })
              }
            />
            <input
              name="pageColor"
              type="color"
              value={pageBgColor}
              onInput={({ target: { value } }) =>
                setSelectedTheme({ ...selectedTheme, pageBgColor: value })
              }
            />
          </div>
        </div>
        <div className="drawer-input">
          <label>Form Color</label>
          <div className="color-input">
            <input
              name="formColorHex"
              type="text"
              value={formBgColor}
              onChange={({ target: { value } }) =>
                setSelectedTheme({ ...selectedTheme, formBgColor: value })
              }
            />
            <input
              name="formColor"
              type="color"
              value={formBgColor}
              onInput={({ target: { value } }) =>
                setSelectedTheme({ ...selectedTheme, formBgColor: value })
              }
            />
          </div>
        </div>
        <div className="drawer-input">
          <label>Input Background</label>
          <div className="color-input">
            <input
              name="formColorHex"
              type="text"
              value={inputBgColor}
              onChange={({ target: { value } }) =>
                setSelectedTheme({ ...selectedTheme, inputBgColor: value })
              }
            />
            <input
              name="formColor"
              type="color"
              value={inputBgColor}
              onInput={({ target: { value } }) =>
                setSelectedTheme({ ...selectedTheme, inputBgColor: value })
              }
            />
          </div>
        </div>
        <div className="drawer-input">
          <label>Input Style</label>
          <select
            name="inputStyle"
            // style={{ color: primaryColor }}
            onChange={({ target: { value } }) =>
              setSelectedTheme({ ...selectedTheme, inputStyle: value })
            }
          >
            <option value="default">Default</option>
            <option value="secondary">Secondary</option>
          </select>
        </div>
        <div className="drawer-input">
          <label>Page Image</label>
          <label for="pageImage" class="custom-file-upload">
            <i class="fa fa-cloud-upload"></i> Upload here
          </label>
          <input
            id="pageImage"
            type="file"
            accept="image/*"
            name="pageImage"
            onChange={(e) => {
              const [file] = e.target.files;
              setSelectedTheme({
                ...selectedTheme,
                pageBgImg: URL.createObjectURL(file),
              });
            }}
          />
        </div>
        <div className="drawer-input">
          <label>Form Image</label>
          <label for="formImage" class="custom-file-upload">
            <i class="fa fa-cloud-upload"></i> Upload Here
          </label>
          <input
            id="formImage"
            type="file"
            accept="image/*"
            name="formImage"
            onChange={(e) => {
              const [file] = e.target.files;
              setSelectedTheme({
                ...selectedTheme,
                formBgImg: URL.createObjectURL(file),
              });
            }}
          />
        </div>
        <div className="drawer-input">
          <label>Font Color</label>
          <div className="color-input">
            <input
              name="formColorHex"
              type="text"
              value={fontColor}
              onChange={({ target: { value } }) =>
                setSelectedTheme({ ...selectedTheme, fontColor: value })
              }
            />
            <input
              name="formColor"
              type="color"
              value={fontColor}
              onInput={({ target: { value } }) =>
                setSelectedTheme({ ...selectedTheme, fontColor: value })
              }
            />
          </div>
        </div>
        <div className="drawer-input">
          <label>Form Width</label>
          <input
            type="number"
            name="formWidth"
            value={formWidth}
            onChange={({ target: { valueAsNumber } }) => {
              if (valueAsNumber >= 768) {
                setSelectedTheme({
                  ...selectedTheme,
                  formWidth: valueAsNumber,
                });
              }
            }}
          />
        </div>
        <div className="drawer-input">
          <label>Label Alignment</label>
          <select
            name="labelAlignment"
            // style={{ color: primaryColor }}
            value={labelAlignment}
            onChange={({ target: { value } }) =>
              setSelectedTheme({ ...selectedTheme, labelAlignment: value })
            }
          >
            <option value="top">Top</option>
            <option value="left">Left</option>
          </select>
        </div>
      </div>
    </Drawer>
  );
};

export default LeftDrawer;
