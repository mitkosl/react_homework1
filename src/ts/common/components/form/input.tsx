import * as React from "react";
import { Icon, SemanticICONS } from "semantic-ui-react";
import { Input as InputSemantic } from 'semantic-ui-react'

interface Props {
  id?: string;
  className?: string
  name: string;
  label: string;
  placeholder?: string;
  value: number | string;
  onChange: (fieldName: string, value: string) => void;
  error?: string;
}

export const Input: React.StatelessComponent<Props> = (props) => {
  return (
    <div className={formatWrapperClass(props)}>
      <label htmlFor={props.name}>{props.label}</label>
      <div className="field">
        <input type="text"
          name={props.name}
          className="form-control"
          placeholder={props.placeholder}
          value={props.value}
          onChange={onChangeInput(props)}
        />
      </div>
      <div className="help-block">{props.error}</div>
    </div>
  )
};

interface State {
  isPasswordShown: boolean;
}
export class InputPassword extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      isPasswordShown: false
    };
  }

  private onShowPasswordOnOff = () => {
    this.setState({
      isPasswordShown: !this.state.isPasswordShown,
    });
  }

  render() {
    var type = this.state.isPasswordShown ? 'text' : 'password';
    var icon = this.state.isPasswordShown ? 'glyphicon-eye-close' : 'glyphicon-eye-open'
    var hidden = !this.props.value ? 'password-eye-icon-hide' : '';
    return (
      <div className={formatWrapperClass(this.props)}>
        <label htmlFor={this.props.name}>{this.props.label}</label>
        <div className="field">
          <input type={type}
            name={this.props.name}
            className="form-control"
            placeholder={this.props.placeholder}
            value={this.props.value}
            onChange={onChangeInput(this.props)}
          />
          <span className={`glyphicon ${icon} password-eye-icon ${hidden}`} onClick={this.onShowPasswordOnOff} />
        </div>
        <div className="help-block">{this.props.error}</div>
      </div>
    )
  }
}

interface PropsByType {
  value: any;
  type: any,
  name: string;
  className?: string;
  placeholder?: string;
  onChange: (target, value) => void;
}

export class InputbyType extends React.Component<PropsByType> {
  constructor(props) {
    super(props);
  }

  render() {
    switch (this.props.type) {
      case 'string':
        return (<input className={`form-control ${this.props.className}`} type='text' name={this.props.name} placeholder={this.props.placeholder} value={this.props.value} onChange={e => this.props.onChange(this.props.name, e.target.value)} />)
      case 'boolean':
        return (<input className="form-control" type="checkbox" name={this.props.name} checked={this.props.value} onChange={e => this.props.onChange(this.props.name, e.target.checked)} />);
      case 'INT':
      case 'double':
        return (<input className={`form-control ${this.props.className}`} type='number' name={this.props.name} placeholder={this.props.placeholder} value={this.props.value} onChange={e => this.props.onChange(this.props.name, e.target.value)} />)
      default:
        return (<input className={`form-control ${this.props.className}`} type='text' name={this.props.name} placeholder={this.props.placeholder} value={this.props.value} onChange={e => this.props.onChange(this.props.name, e.target.value)} />)
    }
  }
}

export const InputTextArea: React.StatelessComponent<Props> = (props) => {
  return (
    <div className={formatWrapperClass(props)}>
      <label htmlFor={props.name}>{props.label}</label>
      <div className="field">
        <textarea
          name={props.name}
          id={props.id}
          className={"form-control " + props.className}
          value={props.value}
          onChange={e => props.onChange(e.target.name, e.target.value)}>
        </textarea>
      </div>
      <div className="help-block">{props.error}</div>
    </div>
  )
};

const formatWrapperClass = (props: Props) => {
  const wrapperClass = 'form-group';

  return props.error ?
    `${wrapperClass} has-error` :
    wrapperClass;
};

const onChangeInput = (props: Props) => (e: React.ChangeEvent<HTMLInputElement>) => {
  props.onChange(e.target.name, e.target.value);
};