import React, { Component } from 'react';
import { connect } from 'react-redux';

function filtrarPorNome(arrayParaFiltrar, textoDoFiltro) {
  return arrayParaFiltrar.filter((obj) => obj.name.toUpperCase().includes(textoDoFiltro.toUpperCase()));
}

function filtrarPorComparação(arrayParaFiltrar, objectNumericValues) {
  const { column, comparison, value } = objectNumericValues;
  return arrayParaFiltrar.filter((objComCadaPlaneta) => {
    if (objComCadaPlaneta[column] === 'unknown') return false;

    switch (comparison) {
      case 'maior que': return Number(objComCadaPlaneta[column]) > Number(value);
      case 'menor que': return Number(objComCadaPlaneta[column]) < Number(value);
      case 'igual a': return Number(objComCadaPlaneta[column]) === Number(value);
      default: return true;
    }
  });
}

function filtrarTodasAsComparações(arrayFiltradoPorNome, arrayNumericFilters) {
  let arrayPlanetasFiltrado = arrayFiltradoPorNome;
  console.log(arrayNumericFilters)

  arrayNumericFilters.forEach((objectNumericValues) => {
    arrayPlanetasFiltrado = filtrarPorComparação(arrayPlanetasFiltrado, objectNumericValues);
  });

  console.log('uhuhu', arrayPlanetasFiltrado)
  return arrayPlanetasFiltrado;
}

const callbackParaSortName = (objPlanet1, objPlanet2) => (
  objPlanet1.name > objPlanet2.name ? 1 : -1
);

const callbackParaSortNumeros = (objPlanet1, objPlanet2, column) => (
  Number(objPlanet1[column]) > Number(objPlanet2[column]) ? 1 : -1
);

function ordenarArray(arrayASerOrdenado, objOrdenação) {
  const { column, order } = objOrdenação;

  const arrayOrdenado = arrayASerOrdenado;

  if (column === 'name') {
    arrayOrdenado.sort(
      callbackParaSortName,
    );
  } else {
    arrayOrdenado.sort(
      (obj1, obj2) => callbackParaSortNumeros(obj1, obj2, column),
    );
  }

  if (order === 'DESC') {
    arrayOrdenado.reverse();
  }

  return arrayOrdenado;
}

class Table extends Component {
  render() {
    const { arrayPlanetas, textoDoFiltro, arrayNumericFilters, objOrdenação } = this.props;

    const arrayFiltradoPorNome = filtrarPorNome(arrayPlanetas, textoDoFiltro);
    // const arrayFiltradoPorComparação = filtrarPorComparação(arrayFiltradoPorNome, objectNumericValues);
    const arrayFiltrado = filtrarTodasAsComparações(arrayFiltradoPorNome, arrayNumericFilters);
    const arrayFiltradoEOrdenado = ordenarArray(arrayFiltrado, objOrdenação);
    const entradasDoCabeçalhoDaTabela = Object.keys(arrayFiltradoEOrdenado[0] || {});
    const residentsIndex = entradasDoCabeçalhoDaTabela.indexOf('residents');

    return (
      <table>
        <thead>
          <tr>
            {entradasDoCabeçalhoDaTabela.map((entrada, index) => (
              (index !== residentsIndex) ? (<th key={entrada}>{entrada}</th>) : null
            ))}
          </tr>
        </thead>
        <tbody>
          {arrayFiltradoEOrdenado.map((objComCadaPlaneta) => (
            <tr key={objComCadaPlaneta.name}>
              {Object.values(objComCadaPlaneta).map((entrada, index) => (
                  (index !== residentsIndex) ? (<td key={entrada}>{entrada}</td>) : null
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  arrayPlanetas: state.data.arrayPlanetas,
  textoDoFiltro: state.filters[0].name,
  objectNumericValues: (state.filters[1] || {}).numericValues || {},
  arrayNumericFilters: state.filters.slice(1).map((obj) => obj.numericValues),
  objOrdenação: state.sorting,
});

export default connect(mapStateToProps)(Table);
