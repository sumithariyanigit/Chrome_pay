import Select from 'react-select';
import React, { Component } from "react";
import ReactDOM from "react-dom";
import { default as ReactSelect } from "react-select";
import { components } from "react-select";
import { red } from '@material-ui/core/colors';

const colourOptions = [
  { value: "VOID", label: "VOID"},
  { value: "PENDING", label: "PENDING" },
  { value: "PENDING_PAYMENT", label: "PENDING_PAYMENT" },
  { value: "CONFIRMED", label: "CONFIRMED" },
  { value: "HELD", label: "HELD" },
  { value: "CANCELLED", label: "CANCELLED" },
  { value: "PAID_OUT", label: "PAID_OUT" },
];

const Option = (props) => {
  return (
    <div>
      <components.Option {...props}>
        <input type="checkbox" checked={props.isSelected}   onChange={() => null} />{" "}
        <label>{props.label}</label>
      </components.Option>
    </div>
  );
};

export default class Example  extends Component {
  constructor(props) {
    super(props);
    this.state = {
      optionSelected: null
    };
  }

  handleChange = (selected) => {
    this.setState({
      optionSelected: selected
    });
  };

  render() {
    return (
      <span
        class=""
        data-toggle="popover"
        data-trigger="focus"
        data-content="Please selecet account(s)">
        <ReactSelect options={colourOptions} isMulti closeMenuOnSelect={false}  hideSelectedOptions={false}
          components={{ Option } } allowSelectAll={true}
          onChange={this.handleChange} allowSelectAll={true} value={this.state.optionSelected}
        />
      </span>
    );
  }
}
