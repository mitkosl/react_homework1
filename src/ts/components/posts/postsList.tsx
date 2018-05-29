import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Link } from "react-router";
import { PostEntity } from '../../models';
import { PostsEditFormModal } from '.';
import { DeleteConfirmationModal } from '../../common';

interface Props {
    posts: PostEntity[];
    onDelete: (post: PostEntity) => void;
    onSave: (post: PostEntity) => void;
}

interface State {
    addPostModalIsOpen: boolean;
    deleteModalIsOpen: boolean;
    postParameter: PostEntity;
    filter: string;
}

export class PostsList extends React.Component<Props, State> {
    constructor(props) {
        super(props);

        this.state = {
            addPostModalIsOpen: false,
            deleteModalIsOpen: false,
            postParameter: null,
            filter: null,
        }
    }

    private showEditForm = (param, post) => {
        let postParameter = null;
        switch (param) {
            case 'Add':
                postParameter = null
                break;
            case 'Edit':
                postParameter = post
        }
        this.setState({
            addPostModalIsOpen: true,
            postParameter
        });
    }

    private onEditModalClose = () => {
        this.setState({
            addPostModalIsOpen: false,
        });
    }

    private message: string = "";

    private showDeleteModal = (post) => {
        this.setState({ deleteModalIsOpen: true, postParameter: post });
    }

    private onDeleteModalClose = () => {
        this.setState({ deleteModalIsOpen: false, postParameter: null });
    }

    private onDeleteModalConfirmed = () => {
        this.props.onDelete(this.state.postParameter);
        this.onDeleteModalClose();
    }
    //end Delete Post Modal functions

    private onFilterChanged = (value) => {
        this.setState({ filter: value });
    }

    private getImageFromUri = (uri) => {
        fetch(uri)
            .then(result => {
                console.log(result);
                return result.json();
            })
            .then(data => {
                const img = document.createElement('img');
                img.src = data.avatar_url;
                //document.body.append(img);
                return img;
            })
            .catch(err => console.log(err));
    }

    private statusList = ['active', 'inactive'];

    public render() {
        return (
            <div>
                <h2> Posts </h2>
                <button className="btn btn-success button-edit btn-md addButton"
                    onClick={() => this.showEditForm('Add', null)}>
                    <span className="glyphicon glyphicon-plus"></span> Add new post
                    </button>

                <div className="postsList">
                    <div className="row">
                        <div className="col-sm-8">Last 15 posts: </div>
                        <div className="col-sm-1 text-right">Filter: </div>
                        <div className="col-sm-3">
                        <select name="status" className="form-control" id="status"
                                onChange={e => this.onFilterChanged(e.target.value)}
                                value={this.state.filter}>
                                <option value="All">All</option>
                                {this.statusList.map((c) =>
                                    <option key={c} value={c}>{c}</option>)}
                            </select>
                        </div>

                    </div>

                    {
                        this.props.posts
                            .filter(e => {
                                if(this.state.filter == "All") return true;
                                else 
                                if (e.status == this.state.filter) return true;
                                return false;
                            })
                            .slice(0, 15)
                            .sort((a, b) => b.date - a.date)
                            .map((post: PostEntity) => {
                                return (
                                    <div className={'jumbotron'} key={post.id}>
                                        <div className="row">
                                            <h2 className="text-left" style={{ display: 'inline-block' }}>{post.title}
                                                <sup style={{ fontSize: '0.5em' }}>{'  ' + post.status}</sup>
                                            </h2>
                                        </div>
                                        {
                                            post.imgUrl ?
                                                <div className="row">
                                                    <div className="col-sm-12 text-center">
                                                        <img width="200" height="200" src={post.imgUrl} alt={'post_' + post.id + '_image'} />
                                                    </div>
                                                </div> : null
                                        }
                                        <hr />
                                        <div className="row">
                                            <div className="col-sm-12 text-center">{post.text}</div>
                                        </div>
                                        <div className="row">
                                            <div className="col-sm-4 text-right text-danger">
                                                {
                                                    post.tags.split(/[ ,]+/).map(s => ' #' + s)
                                                }
                                            </div>
                                            <div className="col-sm-8 text-right">
                                                <span>{post.author} - </span>
                                                <span>{post.date ? new Date(post.date).toDateString() + ' ' + new Date(post.date).toLocaleTimeString() : ''}</span>
                                                <button className="btn btn-primary button-edit btn-md addButton"
                                                    onClick={() => this.showEditForm('Edit', post)}>
                                                    <span className="glyphicon glyphicon-edit"></span> Edit
                                                </button>
                                                <button className="btn btn-danger button-edit btn-md deleteButton"
                                                    onClick={() => this.showDeleteModal(post)}>
                                                    <span className="glyphicon glyphicon-trash"></span> Delete
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                    }
                </div>

                <div className="forms">
                    {
                        this.state.addPostModalIsOpen ?
                            <PostsEditFormModal
                                open={this.state.addPostModalIsOpen}
                                post={this.state.postParameter}
                                onClose={this.onEditModalClose}
                                onSave={this.props.onSave} /> :
                            null
                    }
                    {
                        this.state.deleteModalIsOpen ?
                            <DeleteConfirmationModal
                                open={this.state.deleteModalIsOpen}
                                title={'Delete Post'}
                                isButtonDisabled={this.message.length > 0}
                                onClose={this.onDeleteModalClose}
                                onDeleteConfirmed={this.onDeleteModalConfirmed}>
                                <span>Are you sure you want to delete this element?</span>
                            </DeleteConfirmationModal> :
                            null
                    }
                </div>
            </div>
        );
    }
}