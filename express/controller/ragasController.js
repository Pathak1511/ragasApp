const raga = require("../model/ragas");
const AppError = require("../utils/newAppError");
const catchAsync = require("../utils/catchAsync");

exports.getRagas = catchAsync(async (req, res, next) => {
  const query = raga.find();
  console.log(query);
  const ragas = await query;

  res.status(200).json({
    status: "success",
    ragas,
  });
});
