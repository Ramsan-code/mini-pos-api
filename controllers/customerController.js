import customer from "../models/customer.js";
//<-----------------getallcustomers in mongo atlas & mongo compass & basic error handling----------------->
export const getCustomers = async (req, res) => {
  try {
    const customers = await customer.find();
    res.status(200).json(customers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//<---------------------get one customer in their id at mongo atlas & mongo compass & basic error handling---------------->
export const getCustomerById = async (req, res) => {
  try {
    const customerID = req.params.id;
    const findcustomer = await customer.findById(customerID);
    if (!findcustomer) {
      return res
        .status(404)
        .json({
          message: "Customer Not Found !Please Create New One ...Thank you ",
        });
    }
    res.json(findcustomer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//<-----------------create a customer in  id & find dublicate ,space errors ,vaildation errors & basic error handling  -------------->
export const createCustomer = async (req, res) => {
  try {
    const customers = await customer.create(req.body);
    res.status(201).json(customers);
    } catch (error) {
    res.status(400).json({message:error.message})
  }
};

//<------------------update a cutomer details in their id , basic error handling , space errors  ,validation errors ------------>
// export const updateCustomer = async (req, res) => {

// };

//<---------------------delete one customer in their is id , basic error handling ---------------------------->
// export const deleteCustomer = async (req, res) => {

// };
