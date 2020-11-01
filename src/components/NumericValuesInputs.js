import React, { Component } from 'react';
import { connect } from 'react-redux';

class NumericValuesInputs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      column: '',
      comparison: '',
      value: '',
    };
    this.adicionaFiltro = this.adicionaFiltro.bind(this);
  }

  adicionaFiltro() {
    const { dispatch } = this.props;

    const numericValues = this.state;
    dispatch({ type: 'ADICIONAR_FILTRO', numericValues })

    this.setState({
      column: '',
      comparison: '',
      value: '',
    });
  }

  render() {
    const { column, comparison, value } = this.state;
    const { arrayColunasJáSelecionadas } = this.props;

    const arrayTodasAsColunas = ['population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water'];
    const arrayColunasNãoSelecionadas = arrayTodasAsColunas.filter((coluna) => (
      !arrayColunasJáSelecionadas.includes(coluna)
    ));

    return ((arrayColunasNãoSelecionadas.length !== 0)
      ? (
        <div>
          <select
            defaultValue=""
            value={column}
            onChange={(event) => this.setState({ column: event.target.value })}
          >
            <option value="" disabled>Selecione uma coluna</option>
            {arrayColunasNãoSelecionadas.map((coluna) => <option value={coluna}>{coluna}</option>)}
          </select>
          <select
            defaultValue=""
            value={comparison}
            onChange={(event) => this.setState({ comparison: event.target.value })}
          >
            <option value="" disabled>Selecione uma comparação</option>
            <option value="maior que">maior que</option>
            <option value="menor que">menor que</option>
            <option value="igual a">igual a</option>
          </select>
          <input
            type="number"
            placeholder="Digite um número"
            value={value}
            onChange={(event) => this.setState({ value: event.target.value })}
          />
          <button
            type="button"
            disabled={!(column && comparison && value)}
            onClick={this.adicionaFiltro}
          >
            Filtrar
          </button>
        </div>
      ) : null
    );
  }
}

const mapStateToProps = (state) => ({
  arrayColunasJáSelecionadas: state.filters.slice(1).map((obj) => obj.numericValues.column),
});

export default connect(mapStateToProps)(NumericValuesInputs);
