import * as React from 'react'
import { Button, Icon } from 'semantic-ui-react'
import { Modal as ModalReact } from "react-bootstrap";

interface Props {
  onDeleteConfirmed: () => void;
  onClose: () => void;
  isButtonDisabled?: boolean;
  open: boolean;
  title: string;
}

interface State {
}

export class DeleteConfirmationModal extends React.Component<Props, State>  {

  constructor(props) {
    super(props);
    this.state = {
    };
  }
    
  render() {
    return (
      <div>
        <ModalReact show={this.props.open} onHide={this.props.onClose}>
          <ModalReact.Header closeButton>
            <ModalReact.Title>{this.props.title}</ModalReact.Title>
          </ModalReact.Header>
          <ModalReact.Body>
          <span>
            <Icon circular name="delete" size="large" color="red" inverted />
            {this.props.children}
          </span>
          </ModalReact.Body>
          <ModalReact.Footer>
            <div>  
            <button 
            disabled={this.props.isButtonDisabled}
            className="btn btn-danger btn-md deleteButton" onClick={this.props.onDeleteConfirmed}>
                  <span className="glyphicon glyphicon-trash"></span> Delete
            </button>
            <button className="btn btn-primary btn-md cancelButton" onClick={this.props.onClose}>
                  <span className="glyphicon glyphicon-remove"></span> Cancel
            </button>
          </div>
          </ModalReact.Footer>
        </ModalReact>
      </div>
    );
  }
}