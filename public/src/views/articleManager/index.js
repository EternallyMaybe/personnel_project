import React, {Component} from 'react';
import {Table, Divider, Modal, Input, Button, message} from 'antd';
import CategoryTreeSelect from '@/components/categoryTreeSelect'
import {formatDate} from '@/utils/utils';
import http from '@/services';

const confirm = Modal.confirm;
const Search = Input.Search;

class ArticleManager extends Component {
    state = {
        dataSource: [],
        count: 0,
        pageSize: 8,
        columns: [
            {
                title: '标题',
                dataIndex: 'title',
                key: 'title'
            },
            {
                title: '内容',
                dataIndex: 'content',
                key: 'content',
                render: (val) => {
                    if (val.length > 50) {
                        return val.substring(0, 20) + '...';
                    }
                    return val;
                }
            },
            {
                title: '发布者',
                dataIndex: 'publisher',
                key: 'publisher'
            },
            {
                title: '发布时间',
                dataIndex: 'publishTime',
                key: 'publishTime',
                render: (val) => formatDate(val, 'yyyy-MM-dd hh:mm:ss') 
            },
            {
                title: '类别',
                dataIndex: 'category',
                key: 'category'
            },
            {
                title: '点赞数',
                dataIndex: 'greatNum',
                key: 'greatNum',
                render: (val) => val || 0
            },
            {
                title: '浏览量',
                dataIndex: 'viewNum',
                key: 'viewNum',
                render: (val) => val || 0
            },
            {
                title: '操作',
                dataIndex: 'operation',
                key: 'operation',
                render: (text, rowData) => (
                    <div>
                        <a href="javascript:;" onClick={this.openDetailPage.bind(this, rowData.id)}>编辑</a>
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
        searchCondition: '',
        category: ''
    }
    
    openDetailPage(id) {
        this.props.history.push(`/home/articleManager/detail/${id}`);
    }

    delete(id) {
        let self = this;

        confirm({
            title: '你确定要删除此条记录吗？',
            onOk() {
                http.delete(`/api/articles/delete/${id}`)
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
        let condition = this.state.searchCondition.replace(/&title=[^&]*/, '');
        this.setState({
            searchCondition: `${condition}&title=${val}`
        }, () => {
            this.getDataByPage(1, this.state.pageSize);
        });
    }

    handleSelect(val='') {
        this.setState({
            searchCondition: `&category=${val}`,
            category: val
        }, () => {
            this.getDataByPage(1, this.state.pageSize);
        });
    }

    getDataByPage(page, pageSize) {
        http.get(`/api/articles/list?page=${page}&pageSize=${pageSize}${this.state.searchCondition}`)
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
            <div className="article-manager">
               <CategoryTreeSelect 
                    className='search-select' 
                    category='article'
                    selected={this.state.category}
                    onChange={this.handleSelect.bind(this)}
                />
                <Search 
                    placeholder="请输入标题"
                    onSearch={this.search.bind(this)}
                    enterButton />
                <Button type="primary" onClick={this.openDetailPage.bind(this, 0)}>新增</Button>
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
            </div>
                      
        )
    }
}

export default ArticleManager;