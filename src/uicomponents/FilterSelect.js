import React from "react";

import Filter from "../components/Filter.js";

import {FieldFilter} from "../utils/FilterUtils.js";

function defaultOption(label) {
  return (
    <option key={-1} value={-1}></option>
  );
}

export default class FilterSelect extends React.Component {
  static propTypes = {
    options: React.PropTypes.arrayOf(React.PropTypes.shape({
      field: React.PropTypes.string,
      op: React.PropTypes.string,
      value: React.PropTypes.string,
    })).isRequired,
    namespace: React.PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {filter: -1};

    this.onFilterChange = this.onFilterChange.bind(this);
  }

  onFilterChange(evt) {
    this.setState({filter: Number(evt.target.value)});
  }

  render() {
    const {namespace, ...others} = this.props;
    const options = [defaultOption()].concat(this.props.options.map((n, i) => {
      return <option key={i} value={i}>{n.value}</option>;
    }));

    const filter = this.state.filter >= 0 ? (
      <Filter
        namesapce={namespace}
        data={FieldFilter(
          this.props.options[this.state.filter].field,
          this.props.options[this.state.filter].op,
          this.props.options[this.state.filter].value,
        )}
      />
    ) : null;

    return (
      <div>
        <select value={this.state.filter} onChange={this.onFilterChange}>
          {options}
        </select>
        {filter}
      </div>
    );
  }
}
