import { Layout, Menu } from "antd";
import { useState } from "react";
import {
  PieChartOutlined,
  FundProjectionScreenOutlined,
  DesktopOutlined,
  UserOutlined,
  TeamOutlined,
  FileOutlined
} from "@ant-design/icons";
import "./Sidebar.scss";
import { useHistory } from "react-router-dom";
interface SidebarProps {}

const Sidebar: React.FunctionComponent<SidebarProps> = () => {
  const { Sider } = Layout;
  const { SubMenu } = Menu;
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const [handleLogo, setHandleLogo] = useState<string>("logo");

  const history = useHistory()
  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={() => {
        setCollapsed(!collapsed);
        if (handleLogo == "logo") {
          setHandleLogo("logo handle-logo");
        } else {
          setHandleLogo("logo");
        }
      }}
    >
      <div className={handleLogo}>
        <img src="https://www.bluecrossnc.com/sites/default/files/Shot_0.png" />
        <h2>Vaccination Survey</h2>
      </div>
      <Menu theme="light" defaultSelectedKeys={history.location.pathname === "/dashboard" ? ["1"] : ["2"]} mode="inline">
    
          <Menu.Item key="1" icon={<PieChartOutlined />} onClick={() => history.push("/dashboard")}>
            Dashboard
          </Menu.Item>
          <Menu.Item key="2" icon={<FundProjectionScreenOutlined />} onClick={() => history.push("/whiteboard")}>
            Whiteboard
          </Menu.Item>
{/*     

        <Menu.Item key="2" icon={<DesktopOutlined />}>
          Option 2
        </Menu.Item>
        <SubMenu key="sub1" icon={<UserOutlined />} title="User">
          <Menu.Item key="3">Tom</Menu.Item>
          <Menu.Item key="4">Bill</Menu.Item>
          <Menu.Item key="5">Alex</Menu.Item>
        </SubMenu>
        <SubMenu key="sub2" icon={<TeamOutlined />} title="Team">
          <Menu.Item key="6">Team 1</Menu.Item>
          <Menu.Item key="8">Team 2</Menu.Item>
        </SubMenu>
        <Menu.Item key="9" icon={<FileOutlined />}>
          Files
        </Menu.Item> */}
      </Menu>
    </Sider>
  );
};

export default Sidebar;
