import React, { Component } from 'react';
import { connect } from 'react-redux';

class CompletedFilters extends Component {
  render() {
    const { arrayNumericFilters, dispatch } = this.props;

    return (
      <div>
        {arrayNumericFilters.map((obj) => (
          <div>
            <span>
              {`${obj.column} | ${obj.comparison} | ${obj.value}`}
            </span>
            <button
              onClick={() => dispatch({ type: 'REMOVER_FILTRO', qualColuna: obj.column })}
            >
              X
            </button>
          </div>
        ))}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  arrayNumericFilters: state.filters.slice(1).map((obj) => obj.numericValues),
});

export default connect(mapStateToProps)(CompletedFilters);
