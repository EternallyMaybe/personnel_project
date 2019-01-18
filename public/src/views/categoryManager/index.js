import React, {Component} from 'react';
import {Table, Divider, Modal, Input, Button, message} from 'antd';
import http from '@/services';
import CategoryModal from './categoryModal';
import {getNestArr} from '@/utils/utils';

const confirm = Modal.confirm;
const Search = Input.Search;

class CategoryManager extends Component {
    state = {
        dataSource: [],
        count: 0,
        pageSize: 8,
        columns: [
            {
                title: '列表',
                dataIndex: 'codeName',
                key: 'codeName'
            },
            {
                title: '列表名',
                dataIndex: 'codeLetter',
                key: 'codeLetter'
            },
            {
                title: '分类',
                dataIndex: 'category',
                key: 'category'
            },
            {
                title: '操作',
                dataIndex: 'operation',
                key: 'operation',
                render: (text, rowData) => (
                    <div>
                        <a href="javascript:;" onClick={this.openModal.bind(this, rowData, 1)}>新增节点</a>
                        <Divider type="vertical" />
                        <a href="javascript:;" onClick={this.openModal.bind(this, rowData, 2)}>编辑</a>
                        <Divider type="vertical" />
                        <a href="javascript:;" onClick={this.delete.bind(this, rowData)}>删除</a>
                    </div>
                )
            }
        ],
        visible: false,
        modalTitle: '列表新增',
        selectId: 0,
        modalKey: 0,
        searchCondition: '',
        parent: {}
    }

    openModal(rowData, type) {
        this.setState({
            visible: true,
            modalTitle: type === 2 ? '列表编辑' : '列表新增',
            selectId: type === 2 ? rowData.id : 0,
            parent: rowData,
            modalKey: this.state.modalKey + 1
        });
    }

    closeModal(params) {
        this.setState({
            visible: false
        });
        if (params && params.refresh) {
            this.getDataByPage(1, this.state.pageSize);
        }
    }

    delete(rowData) {
        let self = this;

        confirm({
            title: '该节点删除后同时会删除其子节点，您确定要删除此条记录吗？',
            onOk() {
                http.delete(`/api/categories/delete/${rowData.codeLetter}?parent=${rowData.parent}`)
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
            searchCondition: `&category=${val}`
        }, () => {
            this.getDataByPage(1, this.state.pageSize);
        });
    }

    getDataByPage(page, pageSize) {
        http.get(`/api/categories/list?page=${page}&pageSize=${pageSize}${this.state.searchCondition}`)
        .then((res) => {
            this.setState({
                count: res.data.count,
                dataSource: getNestArr(res.data.list),
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
            <div className="category-manager">
                <Search 
                    placeholder="请输入分类"
                    onSearch={this.search.bind(this)}
                    enterButton />
                <Button type="primary" onClick={this.openModal.bind(this, null, 1)}>新增</Button>
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
                    <CategoryModal 
                        visible={this.state.visible}
                        id={this.state.selectId}
                        parent={this.state.parent}
                        title={this.state.modalTitle}
                        onCloseModal={this.closeModal.bind(this)} 
                        key={this.state.modalKey}/>
            </div>
                      
        )
    }
}

export default CategoryManager;