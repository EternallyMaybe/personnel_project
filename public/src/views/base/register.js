import React, {Component} from 'react';
import {Form, Input, Button, Checkbox, message, Select} from 'antd';
import http from '@/services'

const FormItem = Form.Item;

class RegisterForm extends Component {
    handleSubmit(e) {
        e.preventDefault();

        this.props.form.validateFields((err, values) => {
            if (!err) {
                http.post('/api/user/signUp', {
                    userName: values.userName,
                    password: values.password,
                    confirmPassword: values.confirmPassword,
                    phone: values.phone,
                    email: values.email
                }).then((res) => {
                    this.props.history.push('/');
                }).catch((err) => {
                    message.error(err.message);
                })
            }
        });
    }
    validatePhone = (rule, value, callback) => {
        const regRxp = /^1[3|5|7|8][0-9]{9}$/;
        if (value && !regRxp.test(value)) {
            callback('请输入正确的手机号码！');
        }
        callback();
    }
    validatePassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
            callback('两次输入的密码不一致！');
        }
        callback();
    }
    render() {
        const {getFieldDecorator} = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: {span: 24},
                sm: {span: 5}
            },
            wrapperCol: {
                xs: {span: 24},
                sm: {span: 19}
            }
        };
        const prefixSelector = getFieldDecorator('prefix', {
            initialValue: '86'
        })(
            <Select style={{width: 70}}>
                <Option value="86">+86</Option>
                <Option value="87">+87</Option>
            </Select>
        );

        return (
            <div className="register-page">
                <div className="title">后台管理系统</div>
                <Form className="register-form" onSubmit={this.handleSubmit.bind(this)}>
                    <FormItem label="用户名" {...formItemLayout}>
                        {getFieldDecorator('userName', {
                            rules: [
                                {
                                    required: true,
                                    message: '用户名不能为空!'
                                }, 
                                {
                                    min: 6,
                                    max: 15,
                                    message: '用户名长度为-15之间!'
                                }
                            ]
                        })(
                            <Input placeholder="请输入用户名"/>
                        )}
                    </FormItem>
                    <FormItem label="密码" {...formItemLayout}>
                        {getFieldDecorator('password', {
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
                            <Input type="password" placeholder="请输入密码"/>
                        )}
                    </FormItem>
                    <FormItem label="确认密码" {...formItemLayout}>
                        {getFieldDecorator('confirmPassword', {
                            rules: [
                                {
                                    required: true,
                                    message: '确认密码不能为空!'
                                },
                                {
                                    validator: this.validatePassword
                                }
                            ]
                        })(
                            <Input type="password" placeholder="请输入确认密码"/>
                        )}
                    </FormItem>
                    <FormItem label="手机号码" {...formItemLayout}>
                        {getFieldDecorator('phone', {
                            rules: [
                                {
                                    required: true,
                                    message: '手机号码不能为空！'
                                },
                                {
                                    validator: this.validatePhone
                                }
                            ]
                        })(
                            <Input addonBefore={prefixSelector} placeholder="请输入手机号码"/>
                        )}
                    </FormItem>
                    <FormItem label="电子邮箱" {...formItemLayout}>
                        {getFieldDecorator('email', {
                            rules: [
                                {
                                    required: true,
                                    message: '电子邮箱不能为空！'
                                },
                                {
                                    type: 'email', message: '请输入正确的邮箱地址！'
                                }
                            ]
                        })(
                            <Input placeholder="请输入邮箱"/>
                        )}
                    </FormItem>
                    <FormItem wrapperCol={{offset: 10}}>
                        <Button type="primary" htmlType="submit" className="login-form-button">立即注册</Button>
                    </FormItem>
                </Form>
            </div>
        )
    }
}

const Register = Form.create()(RegisterForm);

export default Register;