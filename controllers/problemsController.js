import { executeCpp, generateFile } from "../helper/fileHelper.js";
import { ProblemsModel } from "../models/problemsModel.js";
import { SolutionsModel } from "../models/solutionsModel.js";
import { TestcasesModel } from "../models/testcasesModel.js";

const getProblemsList = async (req, res) => {
  try {
    const problems = await ProblemsModel.find({});
    return res.status(200).json({ problems });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};

const getAParticularProblem = async (req, res) => {
  try {
    const { _id } = req.params;
    const problem = await ProblemsModel.findById(_id);
    return res.status(200).json({ problem });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};

const addAProblem = async (req, res) => {
  try {
    const problemData = req.body;
    const problem = await ProblemsModel.create(problemData);
    return res.status(200).json({ problem });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};

const updateAProblem = async (req, res) => {
  try {
    const { _id } = req.params;
    const problemData = req.body;
    const problem = await ProblemsModel.findByIdAndUpdate(_id, problemData, {
      new: true,
    });
    return res.status(200).json({ problem });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};

const deleteAProblem = async (req, res) => {
  try {
    const { _id } = req.params;
    await ProblemsModel.findByIdAndDelete(_id);
    return res.status(200).json({ message: "Problem Successfully Deleted!!" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};



export {
  getProblemsList,
  getAParticularProblem,
  addAProblem,
  updateAProblem,
  deleteAProblem,
};
