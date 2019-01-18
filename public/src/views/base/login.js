import React, {Component} from 'react';
import {Form, Icon, Input, Button, Checkbox, message} from 'antd';
import http from '@/services'

const FormItem = Form.Item;

class LoginForm extends Component {
    state = {
        name: '',
        password: '',
        checked: false
    }
    handleSubmit(e) {
        e.preventDefault();

        this.props.form.validateFields((err, values) => {
            if (!err) {
                http.post('/api/user/login', {
                    userName: values.userName,
                    password: values.password
                }).then((res) => {
                    if (this.state.checked) {
                        var userData = {
                            name: values.userName,
                            password: values.password,
                            remember: values.remember
                        }
                        localStorage.setItem('userData', JSON.stringify(userData));    
                    }
                    this.props.history.push('home');
                }).catch((err) => {
                    console.log(err);
                    message.error(err.message);
                })
            }
        });
    }
    handleForgotClick() {
        message.error('请联系管理员!');
    }
    toggleChecked(e) {
        if (!e.target.checked) {
            localStorage.removeItem('userData');
        }
        this.setState({
            checked: e.target.checked
        });
    } 
    componentDidMount() {
        var userData = JSON.parse(localStorage.getItem('userData'));
        if (userData && userData.name) {
            this.setState({
                name: userData.name,
                password: userData.password,
                checked: userData.remember
            });
        }
    }
    render() {
        const {getFieldDecorator} = this.props.form;

        return (
            <div className="login-page">
                <div className="title">后台管理系统</div>
                <Form className="login-form" onSubmit={this.handleSubmit.bind(this)}>
                    <FormItem>
                        {getFieldDecorator('userName', {
                            initialValue: this.state.name,
                            rules: [
                                {
                                    required: true,
                                    message: '用户名不能为空!'
                                }, 
                                {
                                    min: 5,
                                    max: 15,
                                    message: '用户名长度为5-15之间!'
                                }
                            ]
                        })(
                            <Input prefix={<Icon type="user" style={{color: 'rgba(0, 0, 0, .25)'}}/>} placeholder="请输入用户名"/>
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('password', {
                            initialValue: this.state.password,
                            rules: [
                                {
                                    required: true,
                                    message: '密码不能为空!'
                                },
                                {
                                    min: 6,
                                    max: 15,
                                    message: '密码长度为6-15之间!'
                                }
                            ]
                        })(
                            <Input prefix={<Icon type="lock" style={{color: 'rgba(0, 0, 0, .25)'}}/>} type="password" placeholder="请输入密码"/>
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('remember', {
                            valuePropName: 'checked',
                            initialValue: this.state.checked
                        })(
                            <Checkbox onChange={this.toggleChecked.bind(this)}>记住密码</Checkbox>
                        )}
                        <a className="login-form-forgot" onClick={this.handleForgotClick.bind(this)}>忘记密码？</a>
                        <Button type="primary" htmlType="submit" className="login-form-button">登录</Button>
                        没有账号？<a href="#/register">注册</a>
                    </FormItem>
                </Form>
            </div>
        )
    }
}

const Login = Form.create()(LoginForm);

export default Login;