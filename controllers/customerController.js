import Customer from "../models/customer.js";

//<-----------------Get all customers----------------->
export const getCustomers = async (req, res) => {
  try {
    const customers = await Customer.find();
    res.status(200).json(customers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//<-----------------Get one customer by ID----------------->
export const getCustomerById = async (req, res) => {
  try {
    const customerID = req.params.id;
    const findcustomer = await Customer.findById(customerID);
    
    if (!findcustomer) {
      return res.status(404).json({
        message: "Customer Not Found! Please Create New One...Thank you",
      });
    }
    
    res.status(200).json(findcustomer);
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(400).json({ message: "Invalid customer ID format" });
    }
    res.status(500).json({ message: error.message });
  }
};

//<-----------------Create a customer----------------->
export const createCustomer = async (req, res) => {
  try {
    const newCustomer = new Customer(req.body);
    const savedCustomer = await newCustomer.save();
    
    res.status(201).json({
      message: "Customer created successfully",
      customer: savedCustomer,
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ 
        message: "Validation Error", 
        errors: errors 
      });
    }
    
    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern)[0];
      return res.status(409).json({ 
        message: `Customer with this ${field} already exists` 
      });
    }
    
    res.status(500).json({ error: error.message });
  }
};

//<-----------------Update customer details----------------->
export const updateCustomer = async (req, res) => {
  try {
    const customerID = req.params.id;
    
    const updatedCustomer = await Customer.findByIdAndUpdate(
      customerID,
      req.body,
      { 
        new: true,
        runValidators: true
      }
    );
    
    if (!updatedCustomer) {
      return res.status(404).json({
        message: "Customer not found"
      });
    }
    
    res.status(200).json({
      message: "Customer updated successfully",
      customer: updatedCustomer
    });
    
  } catch (error) {
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ 
        message: "Validation Error", 
        errors: errors 
      });
    }
    
    if (error.kind === 'ObjectId') {
      return res.status(400).json({ 
        message: "Invalid customer ID format" 
      });
    }
    
    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern)[0];
      return res.status(409).json({ 
        message: `Customer with this ${field} already exists` 
      });
    }
    
    res.status(500).json({ message: error.message });
  }
};

//<-----------------Delete one customer by ID----------------->
export const deleteCustomer = async (req, res) => {
  try {
    const customerID = req.params.id;
    
    const deletedCustomer = await Customer.findByIdAndDelete(customerID);
    
    if (!deletedCustomer) {
      return res.status(404).json({
        message: "Customer not found"
      });
    }
    
    res.status(200).json({
      message: "Customer deleted successfully",
      customer: deletedCustomer
    });
    
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(400).json({ 
        message: "Invalid customer ID format" 
      });
    }
    res.status(500).json({ message: error.message });
  }
};