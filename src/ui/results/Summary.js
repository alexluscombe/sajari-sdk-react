import React from "react";

import { resultsEvent } from "../../controllers/pipeline";

class Summary extends React.Component {
  constructor(props) {
    super(props);
    this.onResultsChange = this.onResultsChange.bind(this);
  }

  componentDidMount() {
    this.removeResultsListener = this.props.pipeline.listen(
      resultsEvent,
      this.onResultsChange
    );
  }

  componentWillUnmount() {
    this.removeResultsListener();
  }

  onResultsChange() {
    this.setState(this.props.pipeline.getResults() || {});
  }

  render() {
    const { time, totalResults, error, values, pipeline } = this.props;
    const queryValues = values.get() || {};
    const responseValues = pipeline.getResponseValues() || {};
    const text = responseValues["q"] || queryValues["q"];

    if (error) {
      return null;
    }

    const page = parseInt(queryValues.page, 10);
    const pageNumber = page && page > 1 ? `Page ${page} of ` : "";
    const runOverride = e => {
      e.preventDefault();
      values.set({ q: queryValues["q"], "q.override": "true" });
      pipeline.search();
    };
    const override =
      responseValues["q"] &&
      responseValues["q"].toLowerCase() !== queryValues["q"].toLowerCase()
        ? <span className="sj-result-summary-autocomplete-override">
            {`search instead for `}
            <a onClick={runOverride} href="">
              {" "}{queryValues["q"]}{" "}
            </a>
          </span>
        : null;

    return (
      <div className="sj-result-summary">
        <span className="sj-result-summary-text">
          {`${pageNumber}${totalResults} results for `}
          "<strong>{text}</strong>"{" "}
        </span>
        <span className="sj-result-summary-query-time">{`(${time}) `}</span>
        {override}
      </div>
    );
  }
}

export default Summary;
