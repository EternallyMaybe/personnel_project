import React, {Component} from 'react';
import {Table, Divider, Modal, Input, Button, message} from 'antd';
import http from '@/services';
import UserModal from './userModal';

const confirm = Modal.confirm;
const Search = Input.Search;

class UserManager extends Component {
    state = {
        dataSource: [],
        count: 0,
        pageSize: 8,
        columns: [
            {
                title: '用户名',
                dataIndex: 'name',
                key: 'name'
            },
            {
                title: '手机号',
                dataIndex: 'phone',
                key: 'phone'
            },
            {
                title: '邮箱',
                dataIndex: 'email',
                key: 'email'
            },
            {
                title: '创建时间',
                dataIndex: 'create_time',
                key: 'create_time'
            },
            {
                title: '级别',
                dataIndex: 'level',
                key: 'level'
            },
            {
                title: '操作',
                dataIndex: 'operation',
                key: 'operation',
                render: (text, rowData) => (
                    <div>
                        <a href="javascript:;" onClick={this.openModal.bind(this, rowData.id)}>编辑</a>
                        <Divider type="vertical" />
                        <a href="javascript:;" onClick={this.delete.bind(this, rowData.id)}>删除</a>
                    </div>
                )
            }
        ],
        visible: false,
        modalTitle: '用户新增',
        selectId: 0,
        modalKey: 0,
        searchCondition: ''
    }

    openModal(id) {
        this.setState({
            visible: true,
            modalTitle: id ? '用户编辑' : '用户新增',
            selectId: id,
            modalKey: this.state.modalKey + 1
        });
    }

    closeModal(params) {
        this.setState({
            visible: false
        });
        if (params && params.refresh) {
            this.getDataByPage(this.state.page, this.state.pageSize);
        }
    }

    delete(id) {
        let self = this;

        confirm({
            title: '你确定要删除此条记录吗？',
            onOk() {
                http.delete(`/api/users/delete/${id}`)
                .then((res) => {
                    message.success('删除成功');
                    self.getDataByPage(1, self.state.pageSize);
                })
                .catch((err) => {
                    message.error('删除失败');
                });
            }
        })
       
    }

    search(val) {
        this.setState({
            searchCondition: `&userName=${val}`
        }, () => {
            this.getDataByPage(1, this.state.pageSize);
        });
    }

    getDataByPage(page, pageSize) {
        http.get(`/api/users/list?page=${page}&pageSize=${pageSize}${this.state.searchCondition}`)
        .then((res) => {

            this.setState({
                count: res.data.count,
                dataSource: res.data.list,
                pageSize: pageSize
            });
        });
    }

    componentDidMount() {
        this.getDataByPage(1, this.state.pageSize)
    }

    render() {
        let self = this;

        return (
            <div className="user-manager">
                <Search 
                    placeholder="请输入姓名"
                    onSearch={this.search.bind(this)}
                    enterButton />
                <Button type="primary" onClick={this.openModal.bind(this, 0)}>新增</Button>
                <Table bordered
                    rowKey="id"
                    dataSource={this.state.dataSource}
                    columns={this.state.columns}
                    pagination={{
                        total: this.state.count,
                        defaultPageSize: this.state.pageSize,
                        pageSizeOptions: ['8', '16', '24'],
                        showQuickJumper: true,
                        showSizeChanger: true,
                        onShowSizeChange(current, pageSize) {
                            self.getDataByPage(1, pageSize);
                        },
                        onChange(page, pageSize) {
                            self.getDataByPage(page, pageSize);
                        }
                    }} />
                    <UserModal 
                        visible={this.state.visible}
                        id={this.state.selectId}
                        title={this.state.modalTitle}
                        onCloseModal={this.closeModal.bind(this)} 
                        key={this.state.modalKey}/>
            </div>
                      
        )
    }
}

export default UserManager;