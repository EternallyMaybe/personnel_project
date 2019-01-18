import React, {Component} from 'react';
import {Switch, Route} from 'react-router-dom';
import {Layout, Menu, Dropdown, Icon} from 'antd';
import headerImg from '@/assets/img/header.jpg'
import http from '@/services';
import {inject} from 'mobx-react';
import UserManager from '../userManager';
import ArticleManager from '../articleManager';
import CategoryManager from '../categoryManager';
import ArticleDetail from '../articleManager/articleDetail'
import NotMatch from './404';

const {Header, Content, Footer, Sider} = Layout;

@inject('rootStore')
class Home extends Component {
    state = {
        collapsed: false,
        userInfo: {}
    }
    handleCollapse = (collapsed) => {
        this.setState({collapsed});
    }
    handleLogout = () => {
        http.post('/api/user/signout', {
            userName: ''
        }).then(() => {
            this.props.history.push('/');
        });
    }
    handleMenu = (e) => {
        this.props.history.push('/home/' + e.key);
    }
    componentDidMount() {
        http.get('/api/user/info')
        .then((res) => {
            this.setState({
                userInfo: res.data
            });
            this.props.rootStore.setUserInfo(res.data);
        })
    } 
    render() {
        const menu = (
            <Menu onClick={this.handleLogout}>
                <Menu.Item>
                    退出
                </Menu.Item>
            </Menu>
        );

        return (
            <Layout>
                <Sider 
                    collapsible
                    collapsed={this.state.collapsed}
                    onCollapse={this.handleCollapse}    
                >
                    <div className="sider-title">后台管理</div>
                    <Menu theme="dark" defaultSelectedKeys={['1']} onClick={this.handleMenu}>
                        <Menu.Item key="userManager">
                            <Icon type="user"/>
                            <span>用户管理</span>
                        </Menu.Item>
                        <Menu.Item key="categoryManager">
                            <Icon type="bars"/>
                            <span>列表管理</span>
                        </Menu.Item>
                        <Menu.Item key="articleManager">
                            <Icon type="file"/>
                            <span>文章管理</span>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout>
                    <Header>
                        <div className="header-info">
                            欢迎您，{this.state.userInfo.userName}
                            <Dropdown overlay={menu}>
                                <img className="header-img" src={headerImg} />
                            </Dropdown>
                        </div>
                    </Header>
                    <Content>
                        <Switch>
                            <Route exact path="/home" component={UserManager}></Route>
                            <Route exact path="/home/userManager" component={UserManager}></Route>
                            <Route exact path="/home/categoryManager" component={CategoryManager}></Route>
                            <Route exact path="/home/articleManager" component={ArticleManager}></Route>
                            <Route exact path="/home/articleManager/detail/:id" component={ArticleDetail}></Route>
                            <Route component={NotMatch}></Route>
                        </Switch>
                    </Content>
                    <Footer>
                        &copy;2018 Created by LC.All Rights Reserved.
                    </Footer>
                </Layout>
            </Layout>
        )
    }
}

export default Home;