import * as yup from "yup";

export const resTableSchema = yup.object().shape({
  tableName: yup.string().required("Table name cannot be blank"),
  capacity: yup
    .number()
    .positive("Capacity must be greater than 0")
    .required("Capacity cannot be blank")
    .typeError("Capacity must be a number"),
  price: yup
    .number()
    .positive("Price must be greater than 0")
    .required("Price cannot be blank")
    .typeError("Price must be a number"),
  deposit: yup
    .number()
    .positive("Deposit must be greater than 0")
    .required("Deposit cannot be blank")
    .typeError("Deposit must be a number"),
  tableCategoryId: yup.number().typeError("Please select table category"),
  imageUrl: yup.string().required("Url image cannot be blank")
});
