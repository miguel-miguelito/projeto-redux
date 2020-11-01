const initialState = [
  {
    name: '',
  },
];

const filtersReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'USUÁRIO_DIGITANDO_NOME':
      return state.map((obj, index) => (
        (index !== 0) ? obj : { name: action.texto }
      ));

    case 'ADICIONAR_FILTRO':
      return [...state, { numericValues: action.numericValues }];

    case 'REMOVER_FILTRO':
      return state.filter((obj, index) => (
        (index === 0) || (obj.numericValues.column !== action.qualColuna)
      ));

    default:
      return state;
  }
};

export default filtersReducer;
