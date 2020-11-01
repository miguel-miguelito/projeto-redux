import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';
import Table from './components/Table';
import NameInput from './components/NameInput';
import NumericValuesInputs from './components/NumericValuesInputs';
import CompletedFilters from './components/CompletedFilters';
import SortingInputs from './components/SortingInputs';

function fetchApiFazendoDispatchsAssincronos() {
  return function(dispatch) {
    dispatch({ type: 'COMEÇAR_A_REQUISIÇÃO' });

    return fetch('https://swapi-trybe.herokuapp.com/api/planets')
      .then((response) => (
        response.json()
          .then((json) => (response.ok ? Promise.resolve(json) : Promise.reject(json)))
      ))
      .then(
        (data) => dispatch({ type: 'REQUISIÇÃO_DEU_CERTO', arrayPlanetas: data.results }),
        (error) => dispatch({ type: 'REQUISIÇÃO_DEU_ERRO', erro: error.message }),
      );
  }
}

class App extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchApiFazendoDispatchsAssincronos())
  }

  render() {
    const { isLoading, error } = this.props;

    if (isLoading) return <div>Carregando...</div>;
    if (error) return <div>{error}</div>;

    return (
      <div className="App">
        <h1>Star Wars</h1>
        <SortingInputs />
        <NameInput />
        <NumericValuesInputs />
        <CompletedFilters />
        <Table />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isLoading: state.data.isLoading,
  error: state.data.erro,
});

export default connect(mapStateToProps)(App);
