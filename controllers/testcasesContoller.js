import { TestcasesModel } from "../models/testcasesModel.js";

const getAllTestcasesForAProblem = async (req, res) => {
  try {
    const { problemId } = req.params;
    const testcases = await TestcasesModel.find({ problem: problemId });
    return res.status(200).json({ testcases });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};

const addATestcase = async (req, res) => {
  try {
    const testcaseData = req.body;
    const testcase = await TestcasesModel.create(testcaseData);
    return res.status(200).json({ testcase });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};

const updateATestcase = async (req, res) => {
  try {
    const { _id } = req.params;
    const testcaseData = req.body;
    const testcase = await TestcasesModel.findByIdAndUpdate(_id, testcaseData, {
      new: true,
    });
    return res.status(200).json({ testcase });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};

const deleteATestcase = async (req, res) => {
  try {
    const { _id } = req.params;
    await TestcasesModel.findByIdAndDelete(_id);
    return res.status(200).json({ message: "Testcase Deleted Successfully!!" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};

export {
  getAllTestcasesForAProblem,
  addATestcase,
  deleteATestcase,
  updateATestcase,
};
