import Sale from "../models/Sale.js";


export const getSales = async (req, res) => {
  try {
    const sales = await Sale.find().populate('customer').populate('items.item');
    res.status(200).json({ success: true, sales });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
export const getSaleById = async (req, res) => {
  try {
    const sale = await Sale.findById(req.params.id).populate('customer').populate('items.item');
    if (!sale)
      return res
        .status(404)
        .json({ success: false, message: "Sale not found" });
    res.status(200).json({ success: true, sale });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
export const createSale = async (req, res) => {
  try {
    const sale = await Sale.create(req.body);
    res.status(201).json({ success: true, message: "Sale created successfully", sale });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
export const updateSale = async (req, res) => {
  try {
    const sale = await Sale.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!sale)
      return res
        .status(404)
        .json({ success: false, message: "Sale not found" });
    res.status(200).json({ success: true, message: "Sale updated successfully", sale });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const deleteSale = async (req, res) => {
  try {
    const deleted = await Sale.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ success: false, message: "Sale not found" });
    res
      .status(200)
      .json({ success: true, message: "Sale deleted successfully", sale: deleted });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
