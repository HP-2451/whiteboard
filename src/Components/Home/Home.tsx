import { Layout } from "antd";
import { Redirect, Route, Switch } from "react-router";
import "./Home.scss";
import MyHeader from "./Header";
import MyFooter from './Footer';
import Sidebar from "./Sidebar";
import Dashboard from "./Content/Dashboard";
import Whiteboard from "./Content/Whiteboard";
const { Header, Footer, Sider, Content } = Layout;

interface HomeProps {}

const Home: React.FunctionComponent<HomeProps> = () => {
  
  return (
    <Layout>
      <Sidebar/>
      <Layout>
        <Header>
          <MyHeader />
        </Header>
        <Content>
          <Switch>
            <Redirect exact from="/" to="/dashboard"/>
            <Route path="/dashboard" component={Dashboard}></Route>
            <Route path="/whiteboard" component={Whiteboard}></Route>
          </Switch>
        </Content>
        <Footer><MyFooter /></Footer>
      </Layout>
    </Layout>
  );
};

export default Home;
