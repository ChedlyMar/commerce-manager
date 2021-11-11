export const formValidation = (product) => {
  let formIsValid = true,
    productError = { nameErr: "", qteErr: "", priceErr: "" };

  if (!product.name) {
    formIsValid = false;
    productError = {
      ...productError,
      nameErr: "Product name is required!",
    };
  } else if (product.name.length < 3) {
    formIsValid = false;
    productError = {
      ...productError,
      nameErr: "Product must have at least 3 char!",
    };
  }

  if (!product.qte) {
    formIsValid = false;
    productError = {
      ...productError,
      qteErr: "Product quantity is required!",
    };
  } else if (product.qte < 0) {
    formIsValid = false;
    productError = {
      ...productError,
      qteErr: "Product quantity must be greater than or equal 0!",
    };
  }

  if (!product.price) {
    formIsValid = false;
    productError = {
      ...productError,
      priceErr: "Product price is required!",
    };
  } else if (product.price < 0) {
    formIsValid = false;
    productError = {
      ...productError,
      priceErr: "Product price must be greater than or equal 0!",
    };
  }

  return { formIsValid, productError };
};
