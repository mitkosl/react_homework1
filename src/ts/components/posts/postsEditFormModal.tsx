import * as React from 'react'
import { Modal as ModalReact } from "react-bootstrap";
import { PostEntity } from '../../models';
import { Input } from '../../common';

interface Props {
  post: PostEntity;
  onSave: (post: PostEntity) => void;
  onClose: () => void;
  open: boolean
}

interface State {
    id: number;
    date: number;
    title: string;
    author: string;
    text: string;
    tags: string;
    imgUrl?: string;
    status: 'active' | 'inactive';
}

export class PostsEditFormModal extends React.Component<Props, State>  {

  constructor(props) {
    super(props);
    if(this.props.post)
      this.isEdit = true;
      else
      this.isEdit = false;

    this.state = {
        id: props.post && props.post.id ? props.post.id : 0,
        date: props.post && props.post.date ? props.post.date : 0,
        title: props.post && props.post.title ? props.post.title : '',
        author: props.post && props.post.author ? props.post.author : '',
        text: props.post && props.post.text ? props.post.text : '',
        tags: props.post && props.post.tags ? props.post.tags : [],
        imgUrl: props.post && props.post.imgUrl ? props.post.imgUrl : '',
        status: props.post && props.post.status ? props.post.status : 'active'
    };
  }

  private isEdit = false;

  private save = (event) => {
    var post = {
        id: this.state.id,
        date: Date.now(),
        title: this.state.title,
        author: this.state.author,
        text: this.state.text,
        tags: this.state.tags,
        imgUrl: this.state.imgUrl,
        status: this.state.status,
      }
    this.props.onClose();
    this.props.onSave(post);
   }

  private onChange = (fieldName, value) => {
    this.setState({
      [fieldName]: value,
    });
  }

  private statusList = ['active', 'inactive'];
  
  render() {
    let titleVerb = !this.isEdit ? "New " : "Edit "
    return (
      <div>
        <ModalReact show={this.props.open} onHide={this.props.onClose} backdrop="static">
          <ModalReact.Header closeButton>
            <ModalReact.Title>{titleVerb} Post</ModalReact.Title>
          </ModalReact.Header>
          <ModalReact.Body>
            <Input
              name="title"
              label="Title"
              placeholder="give me a title"
              value={this.state.title}
              onChange={this.onChange} />
            <Input
              name="author"
              placeholder="enter your name"
              label="Author"
              value={this.state.author}
              onChange={this.onChange} />
            <Input
              name="tags"
              label="Tags"
              placeholder="#tags"
              value={this.state.tags}
              onChange={this.onChange} />
            <Input
              name="imgUrl"
              label="image url"
              placeholder="give me an image :P"
              value={this.state.imgUrl}
              onChange={this.onChange} />

            <label htmlFor="status">Status</label>
            <div className="field">
                <select name="status" className="form-control" id="status"
                    onChange={e => this.onChange(e.target.name, e.target.value)}
                    value={this.state.status}>
                    <option value="">Select status</option>
                    {this.statusList.map((c) =>
                        <option key={c} value={c}>{c}</option>)}
                </select>
            </div>
          </ModalReact.Body>
          <ModalReact.Footer>
            <div>  
          {
            !this.isEdit?
            <button className="btn btn-success btn-md addReasonButton" onClick={this.save}>
                  <span className="glyphicon glyphicon-plus"></span> Add
            </button>:
            <button className="btn btn-success btn-md editReasonButton" onClick={this.save}>
                  <span className="glyphicon glyphicon-floppy-disk"></span> Save
            </button>
          }
            <button className="btn btn-primary btn-md cancelReasonButton" onClick={this.props.onClose}>
                  <span className="glyphicon glyphicon-remove"></span> Cancel
            </button>
          </div>
          </ModalReact.Footer>
        </ModalReact>
      </div>
    );
  }
}