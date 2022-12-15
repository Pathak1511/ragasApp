const { query } = require("express");
const raga = require("./../model/ragas");
const AppError = require("./../utils/newAppError");
const catchAsync = require("./../utils/catchAsync");

exports.getRagas = catchAsync(async (req, res, next) => {
  const query = raga.find();
  const ragas = await query;
  if (!ragas) {
    return next(new AppError("No data found", 404));
  }
  res.status(200).json({
    status: "success",
    ragas,
  });
});
