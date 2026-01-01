import Item from "../models/Item.js";

export const getItems = async (req, res) => {
  try {
    const items = await Item.find();
    res.status(200).json({ success: true, items });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getItemById = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ success: false, message: "Item not found" });
    res.status(200).json({ success: true, item });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createItem = async (req, res) => {
  try {
    const newItem = new Item(req.body);
    const savedItem = await newItem.save();
    res.status(201).json({ success: true, message: "Item created successfully", item: savedItem });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const updateItem = async (req, res) => {
  try {
    const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedItem) return res.status(404).json({ success: false, message: "Item not found" });
    res.status(200).json({ success: true, message: "Item updated successfully", item: updatedItem });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const deleteItem = async (req, res) => {
  try {
    const deletedItem = await Item.findByIdAndDelete(req.params.id);
    if (!deletedItem) return res.status(404).json({ success: false, message: "Item not found" });
    res.status(200).json({ success: true, message: "Item deleted successfully", item: deletedItem });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
