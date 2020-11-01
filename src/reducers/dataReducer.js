const initialState = {
  arrayPlanetas: [],
  isLoading: false,
  erro: null,
};

const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'COMEÇAR_A_REQUISIÇÃO':
      return {
        ...state,
        isLoading: true,
      };

    case 'REQUISIÇÃO_DEU_CERTO':
      return {
        ...state,
        isLoading: false,
        arrayPlanetas: action.arrayPlanetas,
      };

    case 'REQUISIÇÃO_DEU_ERRO':
      return {
        ...state,
        isLoading: false,
        erro: action.erro,
      };

    default:
      return state;
  }
};

export default dataReducer;