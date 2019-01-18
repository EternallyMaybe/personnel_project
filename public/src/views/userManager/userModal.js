import React, {Component} from 'react';
import {Form, Input, message, Select, Modal} from 'antd';
import http from '@/services'

const FormItem = Form.Item;

class UserModalForm extends Component {

    state = {
        visible: false
    }
    initData() {
        if (this.props.id) {
            http.get(`/api/users/detail/${this.props.id}`)
            .then((res) => {
                let data = res.data;

                this.props.form.setFieldsValue({
                    userName: data.name,
                    password: data.password,
                    phone: data.phone,
                    email: data.email
                });
            });
        }
    }
    handleConfirmModal(e) {
        e.preventDefault();

        this.props.form.validateFields((err, values) => {
            if (!err) {
                let formData = {
                    userName: values.userName,
                    password: values.password,
                    phone: values.phone,
                    email: values.email
                };
                let promise = null;       

                if (this.props.id) {
                    promise = http.put(`/api/users/update/${this.props.id}`, formData);                     
                } else {
                    promise = http.post(`/api/users/create`, formData)
                }

                promise.then((res) => {
                    this.props.onCloseModal({
                        refresh: true
                    });
                }).catch((err) => {
                    message.error(err.message);
                })
            }
        });
    }

    handleCancelModal() {
        this.props.onCloseModal({
            refresh: false
        });
    }

    validatePhone = (rule, value, callback) => {
        const regRxp = /^1[3|5|7|8][0-9]{9}$/;
        if (value && !regRxp.test(value)) {
            callback('请输入正确的手机号码！');
        }
        callback();
    }

    componentDidMount() {
        this.initData();
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
            <Modal
                title={this.props.title}
                visible={this.props.visible}
                onOk={this.handleConfirmModal.bind(this)}
                onCancel={this.handleCancelModal.bind(this)}
                okText="保存"
            >
                <Form className="edit-form">
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
                            <Input placeholder="请输入密码"/>
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
                </Form>
            </Modal>
        )
    }
}

const UserModal = Form.create()(UserModalForm);

export default UserModal;