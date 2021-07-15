const reducer = (state, action) => {
  if (action.type === "CLEAR_CART") {
    return { ...state, cart: [] };
  }
  if (action.type === "REMOVE") {
    return {
      ...state,
      cart: state.cart.filter((each) => each.id !== action.payload),
    };
  }

  if (action.type === "INCREASE") {
    let tempCart = state.cart.map((each) => {
      if (each.id === action.payload) {
        return { ...each, amount: each.amount + 1 };
      }
      return each;
    });
    return {
      ...state,
      cart: tempCart,
    };
  }
  if (action.type === "DECREASE") {
    let tempCart = state.cart
      .map((each) => {
        if (each.id === action.payload) {
          return { ...each, amount: each.amount - 1 };
        }
        return each;
      })
      .filter((each) => each.amount !== 0);
    return { ...state, cart: tempCart };
  }

  if (action.type === "GET_TOTALS") {
    const { total, amount } = state.cart.reduce(
      // cartTotal represent the entire cart
      (cartTotal, each) => {
        // each represent all individual objects in array
        const { price, amount } = each;
        const itemTotal = parseFloat(price).toFixed(2) * amount;
        console.log(each.price, each.amount);
        cartTotal.total += itemTotal;
        cartTotal.amount += amount;
        return cartTotal;
      },
      {
        total: 0,
        amount: 0,
      }
    );

    return { ...state, total, amount };
  }

  if (action.type === "LOADING") {
    return { ...state, loading: true };
  }

  if (action.type === "DISPLAY_ITEMS") {
    return { ...state, cart: action.payload, loading: false };
  }
  return state;
};

export default reducer;
