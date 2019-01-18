import React, {Component} from 'react';
import {Tag} from 'antd';
import http from '@/services';

const CheckableTag = Tag.CheckableTag;

class Tags extends Component {
    state = {
        selectedTags: [],
        tags: []
    }

    handleChange(tag, checked) {
        const {selectedTags} = this.state;
        const newSelectedTags = checked
            ? [...selectedTags, tag]
            : selectedTags.filter(item => item !== tag);
        
        this.setState({
            selectedTags: newSelectedTags
        });
        this.props.onChange(newSelectedTags);
    }

    componentDidMount() {
        http.get(`/api/categories/list?page=1&pageSize=1&category=${this.props.category}`)
        .then((res) => {
            var data = res.data.list.filter((item) => item.parent !== '')
            this.setState({
                tags: data
            });
        })
    }

    componentWillReceiveProps(props) {
        this.setState({
            selectedTags: props.selectedTags
        });
    }

    render() {
        const {selectedTags, tags} = this.state;

        return (
            <div className={'tags ' + this.props.className}>
                {
                    tags.map(tag => (
                        <CheckableTag 
                            key={tag.codeLetter}
                            checked={selectedTags.indexOf(tag.codeName) !== -1}
                            onChange={checked => this.handleChange(tag.codeName, checked)}
                        >
                            {tag.codeName}
                        </CheckableTag>
                    ))
                }     
            </div>
        );
    }
}

export default Tags;