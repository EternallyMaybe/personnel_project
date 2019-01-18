import React, {Component} from 'react';
import {Form, Input, message, Select, Modal} from 'antd';
import http from '@/services'

const FormItem = Form.Item;

class CategoryModalForm extends Component {

    state = {
        visible: false,
        codeLetterDisabled: false,
        categoryDisabled: false
    }

    initData() {
        if (this.props.id) {
            http.get(`/api/categories/detail/${this.props.id}`)
            .then((res) => {
                let data = res.data;
                this.setState({
                    codeLetterDisabled: true,
                    categoryDisabled: true
                });
                this.props.form.setFieldsValue({
                    codeName: data.codeName,
                    codeLetter: data.codeLetter,
                    category: data.category,
                    parent: data.parent
                });
            });
            return;
        }
        if (this.props.parent) {
            this.setState({
                categoryDisabled: true
            });
            this.props.form.setFieldsValue({
                category: this.props.parent.category,
                parent: this.props.parent.codeLetter
            });
        }
    }

    handleConfirmModal(e) {
        e.preventDefault();

        this.props.form.validateFields((err, values) => {
            if (!err) {
                let formData = {
                    codeName: values.codeName,
                    codeLetter: values.codeLetter,
                    category: values.category,
                    parent: values.parent
                };
                let promise = null;
                 
                if (this.props.id) {
                    promise = http.put(`/api/categories/update/${this.props.id}`, formData);                     
                } else {
                    formData.level = 1;
                    formData.isLeaf = true;
                    if (this.props.parent) {
                        formData.level = this.props.parent.level + 1;
                        formData.parentId = this.props.parent.id;
                    }
                    promise = http.post(`/api/categories/create`, formData)
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

    validateLetter = (rule, value, callback) => {
        const regRxp = /[a-zA-Z]$/;
        if (value && !regRxp.test(value)) {
            callback('请输入英文字符!');
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

        return (
            <Modal
                title={this.props.title}
                visible={this.props.visible}
                onOk={this.handleConfirmModal.bind(this)}
                onCancel={this.handleCancelModal.bind(this)}
                okText="保存"
            >
                <Form className="edit-form">
                    <FormItem label="类别" {...formItemLayout}>
                        {getFieldDecorator('category', {
                            rules: [
                                {
                                    required: true,
                                    message: '类别不能为空!'
                                }, 
                                {
                                    max: 20,
                                    message: '类别长度为0-20之间!'
                                },
                                {
                                    validator: this.validateLetter
                                }
                            ]
                        })(
                            <Input placeholder="请输入类别" disabled={this.state.categoryDisabled}/>
                        )}
                    </FormItem>
                    <FormItem label="父节点" {...formItemLayout}>
                        {getFieldDecorator('parent', {
                            initialValue: ''
                        })(
                            <Input disabled/>
                        )}
                    </FormItem>
                    <FormItem label="列表" {...formItemLayout}>
                        {getFieldDecorator('codeName', {
                            rules: [
                                {
                                    required: true,
                                    message: '列表不能为空!'
                                },
                                {
                                    max: 20,
                                    message: '列表名长度为0-20之间!'
                                }
                            ]
                        })(
                            <Input placeholder="请输入列表"/>
                        )}
                    </FormItem>
                    <FormItem label="列表名" {...formItemLayout}>
                        {getFieldDecorator('codeLetter', {
                            rules: [
                                {
                                    required: true,
                                    message: '列表名不能为空!'
                                }, 
                                {
                                    max: 20,
                                    message: '列表名长度为0-20之间!'
                                },
                                {
                                    validator: this.validateLetter
                                }
                            ]
                        })(
                            <Input placeholder="列表名为列表的英文" disabled={this.state.codeLetterDisabled}/>
                        )}
                    </FormItem>
                </Form>
            </Modal>
        )
    }
}

const CategoryModal = Form.create()(CategoryModalForm);

export default CategoryModal;