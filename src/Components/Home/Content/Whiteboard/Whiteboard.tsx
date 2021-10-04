import { Button, Col, Row, Menu } from "antd";
import { MouseEventHandler, useRef, useState } from "react";
import { BLACK, PENCIL } from "../../../../constants";
import MyCanvas from "./MyCanvas";
import ToolButtons from "./ToolButtons";
import "./Whiteboard.scss";
import io from "socket.io-client";
import { SelectedTool } from "../../../../dto/whiteboard.dto";
interface WhiteboardProps {}

const socket = io("http://localhost:3002", { transports: ["websocket"] });
const Whiteboard: React.FunctionComponent<WhiteboardProps> = () => {
  const { SubMenu } = Menu;
  const [drawColor, setDrawColor] = useState<string>(BLACK);
  const [selectedTool, setSelectedTool] = useState<SelectedTool>({name: PENCIL, click: 0});
  return (
    <div className="board">
      <Row gutter={16}>
        <Col span={2}>
          <ToolButtons drawColor={drawColor} setDrawColor={setDrawColor} selectedTool={selectedTool} setSelectedTool={setSelectedTool}/>
        </Col>
        <Col span={22}>
          <MyCanvas  socket={socket} drawColor={drawColor} selectedTool={selectedTool}/>
        </Col>
      </Row>
    </div>
  );
};

export default Whiteboard;
