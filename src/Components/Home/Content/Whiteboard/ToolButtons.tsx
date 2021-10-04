import { Button, Menu, message, Tooltip } from "antd";
import { ChangeEvent, Dispatch, SetStateAction } from "react";
import {
  CIRCLE,
  ERASER,
  LINE,
  PENCIL,
  RECTANGLE,
  TEXT,
  TRIANGLE,
} from "../../../../constants";
import { SelectedTool } from "../../../../dto/whiteboard.dto";
interface ToolButtonsProps {
  drawColor: string;
  setDrawColor: Dispatch<SetStateAction<string>>;
  selectedTool: SelectedTool;
  setSelectedTool: Dispatch<SetStateAction<SelectedTool>>;
}

const ToolButtons: React.FunctionComponent<ToolButtonsProps> = ({
  drawColor,
  setDrawColor,
  selectedTool,
  setSelectedTool,
}) => {
  const { SubMenu } = Menu;
  return (
    <div className="drawing-tools">
      <div className="button-groups">
        <Tooltip placement="bottom" color="#05506E" title="Select color">
          <input
            className="my-color-picker"
            type="color"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setDrawColor(e.target.value)
            }
            style={{ backgroundColor: drawColor }}
          />
        </Tooltip>
        <Tooltip placement="bottom" color="#05506E" title="Add Text">
          <Button
            size="large"
            type={`${selectedTool.name === TEXT ? "primary" : "default"}`}
            onClick={() => {
              message.success("Text has added");
              let object: SelectedTool = { ...selectedTool };
              object.name = TEXT;
              object.click = object.click++;
              setSelectedTool(object);
            }}
          >
            <i className="fa fa-text-width" />
          </Button>
        </Tooltip>
        <Tooltip placement="bottom" color="#05506E" title="Select Pencil">
          <Button
            size="large"
            style={
              selectedTool.name === PENCIL
                ? {
                    border: `3px solid #85B9E4`,
                  }
                : {}
            }
            // type="default"
            onClick={() => {
              message.success("Pencil is selected");
              let object: SelectedTool = { ...selectedTool };
              object.name = PENCIL;
              object.click = object.click++;
              setSelectedTool(object);
            }}
          >
            <i className="fa fa-pencil" />
          </Button>
        </Tooltip>

        <Tooltip placement="bottom" color="#05506E" title="Select Shape">
          <Menu
            className="shapes-menu"
            mode="vertical"
            style={
              selectedTool.name === CIRCLE ||
              selectedTool.name === RECTANGLE ||
              selectedTool.name === TRIANGLE ||
              selectedTool.name === LINE
                ? {
                    border: `3px solid #85B9E4`,
                  }
                : {}
            }
          >
            <SubMenu
              key="sub1"
              icon={
                <img
                  src="data:image/png;base64,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"
                  height="20"
                  width="20"
                />
              }
            >
              <Menu.Item
                key="1"
                onClick={() => {
                  message.success("Circle has drawn");
                  let object: SelectedTool = { ...selectedTool };
                  object.name = CIRCLE;
                  object.click = object.click++;
                  setSelectedTool(object);
                }}
              >
                <i className="fa fa-circle-thin fa-2x" aria-hidden="true"></i>
              </Menu.Item>
              <Menu.Item
                key="2"
                onClick={() => {
                  message.success("Rectangle has drawn");
                  let object: SelectedTool = { ...selectedTool };
                  object.name = RECTANGLE;
                  object.click = object.click++;
                  setSelectedTool(object);
                }}
              >
                <i className="fa fa-square-o fa-2x" aria-hidden="true"></i>
              </Menu.Item>
              <Menu.Item
                key="4"
                onClick={() => {
                  message.success("Triangle has drawn");
                  let object: SelectedTool = { ...selectedTool };
                  object.name = TRIANGLE;
                  object.click = object.click++;
                  setSelectedTool(object);
                }}
              >
                <i className="fa fa-caret-up fa-2x" aria-hidden="true"></i>
              </Menu.Item>
              <Menu.Item
                key="3"
                onClick={() => {
                  message.success("Line has drawn");
                  let object: SelectedTool = { ...selectedTool };
                  object.name = LINE;
                  object.click = object.click++;
                  setSelectedTool(object);
                }}
              >
                <i
                  className="fa fa-window-minimize fa-2x"
                  aria-hidden="true"
                ></i>
              </Menu.Item>
            </SubMenu>
          </Menu>
        </Tooltip>
        <Tooltip placement="bottom" color="#05506E" title="Clear Canvas">
          <Button
            size="large"
            type={`${selectedTool.name === ERASER ? "primary" : "default"}`}
            onClick={() => {
              message.success("Canvas has cleared");
              let object: SelectedTool = { ...selectedTool };
              object.name = ERASER;
              object.click = object.click++;
              setSelectedTool(object);
            }}
          >
            <i className="fa fa-eraser" />
          </Button>
        </Tooltip>
      </div>
    </div>
  );
};

export default ToolButtons;
