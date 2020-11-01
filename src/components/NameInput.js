import React, { Component } from 'react';
import { connect } from 'react-redux';

class NameInput extends Component {
  render() {
    const { dispatch } = this.props;

    return (
      <div>
        <input
          type="text"
          placeholder="Pesquisar planeta por nome"
          onChange={(event) => dispatch({ type: 'USUÁRIO_DIGITANDO_NOME', texto: event.target.value })}
        />
      </div>
    );
  }
}

export default connect()(NameInput);
