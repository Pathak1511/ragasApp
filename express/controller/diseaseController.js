const { query } = require("express");
const disease = require("./../model/disease");
const AppError = require("./../utils/newAppError");
const catchAsync = require("./../utils/catchAsync");

exports.getdisease = catchAsync(async (req, res, next) => {
  const query = disease.find();
  const ragas = await query;
  if (!ragas) {
    return next(new AppError("No data found", 404));
  }
  res.status(200).json({
    status: "success",
    ragas,
  });
});
