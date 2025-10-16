import customer from "../models/customer.js";
export const getCustomers = async (req, res) => {
  try {
    const customers = await customer.find();
    res.status(200).json(customers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// export const getCustomerById = async (req, res) => {

// };

// export const createCustomer = async (req, res) => {

// };

// export const updateCustomer = async (req, res) => {

// };

// export const deleteCustomer = async (req, res) => {

// };
