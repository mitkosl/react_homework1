import * as React from 'react';
import { PostEntity } from '../../models';
import * as toastr from 'toastr';
import { postsAPI } from '../../api';
import { PostsList } from '.';

interface State {
  posts: PostEntity[];
  selectedPost: PostEntity;
}

interface Props {
}

export class PostsContainer extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      selectedPost: null,
    };
  }

  private refreshPosts() {
    postsAPI.fetchPosts()
      .then((posts) => {
        this.setState({ posts });
      });
  }

  public componentDidMount() {
    this.refreshPosts();
  }

  private onDelete = (post: PostEntity) => {
    postsAPI.deletePost(post.id)
      .then(() => {
        toastr.info('Post was deleted.');
        this.refreshPosts();
      });
  }

  private onSave = (post: PostEntity) => {
    postsAPI.savePost(post)
      .then(() => {
        toastr.success('Post saved.');
        this.refreshPosts();
      });
    //}
    //});
  }

  render() {
    return (
      <PostsList
        posts={this.state.posts}
        onDelete={this.onDelete}
        onSave={this.onSave}
      />
    );
  }

};