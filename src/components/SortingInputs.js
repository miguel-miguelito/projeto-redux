import React, { Component } from 'react';
import { connect } from 'react-redux';

class SortingInputs extends Component {
  render() {
    const { dispatch } = this.props;

    const arrayColunas = ['name','population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water'];

    return (
      <div>
        <label>
          Ordene alguma coluna:
          <select
            defaultValue="name"
            onChange={(event) => dispatch({ type: 'ALTERAR_COLUNA_DE_ORDENAÇÃO', coluna: event.target.value })}
          >
            {arrayColunas.map((coluna) => <option value={coluna}>{coluna}</option>)}
          </select>
          <select
            defaultValue="ASC"
            onChange={(event) => dispatch({ type: 'ALTERAR_ORDEM_DE_ORDENAÇÃO', ordem: event.target.value })}
          >
            <option value="ASC">ASC</option>
            <option value="DESC">DESC</option>
          </select>
        </label>
      </div>
    );
  }
}

export default connect()(SortingInputs);
