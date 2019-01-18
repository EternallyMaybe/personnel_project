import React, {Component} from 'react';
import {Form, Button, Input, message} from 'antd';
import {inject, observer} from 'mobx-react';
import http from '@/services';
import Tags from '@/components/tags';
import CategoryTreeSelect from '@/components/categoryTreeSelect';
import utils from '@/utils/sourceOperation';

@inject('rootStore')
@observer
class ArticleEditForm extends Component {
    state = {
        editor: null,
        title: '',
        category: '',
        tags: []
    }

    handleChange(obj) {
        this.setState(obj)
    }

    handleInputChange(e) {
        this.setState({
            title: e.target.value
        })
    }
    
    handleSave() {
        let {editor, title, category, tags} = this.state;
        let markdownContent = editor.getMarkdown();
        if (!title) {
            message.error('请输入标题');
            return;
        }

        if (!category) {
            message.error('请选择文章类别');
            return;
        }

        if (!markdownContent) {
            message.error('请输入文章内容');
            return;
        }        

        let promise = null;
        let id = this.props.match.params.id;
        let formData =  {
            title: title,
            content: markdownContent,
            publisher: this.props.rootStore.userInfo.userName,
            category: category,
            tags: tags.toString()
        };
        if (id !== '0') {
            promise= http.put(`/api/articles/update/${id}`, formData);                  
        } else {
            promise = http.post(`/api/articles/create`, formData);
        }
        promise.then((res) => {
            message.success(res.message);
            this.handleBack();
        }).catch((err) => {
            message.error(err.message);
        });
    }

    handleBack() {
        this.props.history.push(`/home/articleManager`);
    }

    initData() {
        let id = this.props.match.params.id;
        if (id !== '0') {
            http.get(`/api/articles/detail/${id}`)
            .then((res) => {
                let data = res.data;
                this.setState({
                    title: data.title,
                    category: data.category,
                    tags: data.tags.split(',')
                });
                this.initMarkDown(data.content);
            })
        } else {
            this.initMarkDown();
        }
    }

    initMarkDown(content) {
        let self = this;
        // 动态加载markdown编辑器 
        utils.loadCss('../../../static/plugins/editor.md/css/editormd.css');
        utils.loadJs('../../../static/plugins/editor.md/jquery.min.js', function() {
            utils.loadJs('../../../static/plugins/editor.md/editormd.min.js', function() {
                let editor = editormd("mdeditor", {
                    width: "100%",
                    height: 640,
                    markdown: content,
                    path: "../../../static/plugins/editor.md/lib/"
                })
                self.setState({editor: editor});
            })
        })
    }

    componentDidMount() {
        this.initData();
    }
    render() {
        return (
            <div className='article-edit'>
                <div className="row">
                    <label>标题:</label>
                    <Input 
                        className='row-content' 
                        placeholder='请输入标题' 
                        value={this.state.title} 
                        onChange={this.handleInputChange.bind(this)}
                    />
                </div>
                <div className="row">
                    <label>类别:</label>
                        <CategoryTreeSelect 
                            className='row-content' 
                            category='article'
                            selected={this.state.category}
                            onChange={val => this.handleChange({category: val})}
                        />
                </div>
                <div className="row">
                    <label>标签:</label>
                    <Tags 
                        className='row-content' 
                        category='tag'
                        selectedTags={this.state.tags}
                        onChange={val => this.handleChange({tags: val})}
                    />
                </div>
                <div id="mdeditor">
                    <textarea style={{display: "none"}}/>
                </div>
                <div className="row operation-group">
                    <Button onClick={this.handleBack.bind(this)}>取消</Button>
                    <Button type="primary" onClick={this.handleSave.bind(this)}>保存</Button>
                </div>
            </div>
        );
    }
}

const ArticleEdit = Form.create()(ArticleEditForm);

export default ArticleEdit;