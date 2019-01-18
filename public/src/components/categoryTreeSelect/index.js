import React, {Component} from 'react';
import {TreeSelect } from 'antd';
import http from '@/services';
import {getNestArr} from '@/utils/utils';

const TreeNode = TreeSelect.TreeNode;

class CategoryTreeSelect extends Component {
    state = {
        selected: undefined,
        treeNodes: (<div></div>)
    }

    handleChange(value) {
        this.setState({
            selected: value
        });
        this.props.onChange(value);
    }

    renderTreeNodes(data) {
        return data.map((item) => {
            if (item.children) {
                return (
                    <TreeNode 
                        value={item.codeLetter} 
                        title={item.codeName} 
                        key={item.codeLetter} 
                        selectable={!!item.isLeaf}>
                        {this.renderTreeNodes(item.children)}
                    </TreeNode>
                );
            }
            return <TreeNode value={item.codeLetter} title={item.codeName} key={item.codeLetter}/>
        })
    }

    componentDidMount() {
        http.get(`/api/categories/list?page=1&pageSize=1&category=${this.props.category}`)
        .then((res) => {
            var data = getNestArr(res.data.list);
            this.setState({
                treeNodes: this.renderTreeNodes(data)[0]
            });
        })
    }

    componentWillReceiveProps(props) {
        this.setState({
            selected: props.selected
        });
    }

    render() {
        const {selectedTags, tags} = this.state;

        return (
            <div className={'tree-select ' + this.props.className}>
                <TreeSelect
                    showSearch
                    value={this.state.selected}
                    style={{width: '100%'}}
                    dropdownStyle={{maxHeight: 400, overflow: 'auto'}}
                    placeholder="请选择分类"
                    allowClear
                    treeDefaultExpandAll
                    onChange={this.handleChange.bind(this)}
                >
                    {...this.state.treeNodes}
                </TreeSelect>  
            </div>
        );
    }
}

export default CategoryTreeSelect;