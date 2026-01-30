import { Request, Response } from "express";

class BaseController {
  model: any;

  constructor(dataModel: any) {
    this.model = dataModel;
  }

  async get(req: Request, res: Response) {
    try {
      const filter = req.query;
      const result = await this.model.find(filter);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({
        error: error instanceof Error ? error.message : "An unknown error occurred",
      });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const result = await this.model.findById(id);
      
      if (!result) {
        return res.status(404).json({ error: "Resource not found" });
      }
      
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({
        error: error instanceof Error ? error.message : "An unknown error occurred",
      });
    }
  }

  async post(req: Request, res: Response) {
    try {
      const newItem = await this.model.create(req.body);
      res.status(201).json(newItem);
    } catch (error) {
      res.status(400).json({
        error: error instanceof Error ? error.message : "An unknown error occurred",
      });
    }
  }

  async put(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const updatedItem = await this.model.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
      });
      
      if (!updatedItem) {
        return res.status(404).json({ error: "Resource not found" });
      }
      
      res.status(200).json(updatedItem);
    } catch (error) {
      res.status(400).json({
        error: error instanceof Error ? error.message : "An unknown error occurred",
      });
    }
  }

  async del(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const deletedItem = await this.model.findByIdAndDelete(id);
      
      if (!deletedItem) {
        return res.status(404).json({ error: "Resource not found" });
      }
      
      res.status(200).json({ message: "Resource deleted successfully" });
    } catch (error) {
      res.status(500).json({
        error: error instanceof Error ? error.message : "An unknown error occurred",
      });
    }
  }
}

export default BaseController;
