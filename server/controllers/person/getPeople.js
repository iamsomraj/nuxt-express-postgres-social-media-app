const asyncHandler = require("express-async-handler");
const PersonsModel = require("../../models/PersonsModel.js");
const { GENERAL_MESSAGES } = require("../../utils/constants/messages.js");

/**
 * @access private
 * @description fetches list of people to show in the explore page
 * @route POST /api/v1/persons/people
 */
const getPeople = asyncHandler(async (req, res) => {
  if (!req || !req.user) {
    res.status(400);
    throw new Error(GENERAL_MESSAGES.INVALID_REQUEST);
  }

  const people = await PersonsModel.query().select("uuid", "id", "name", "email").where("id", "!=", req.user.id);

  if (!people) {
    res.status(404);
    throw new Error("People are not found!");
  }

  if (people) {
    res.json({
      people,
    });
  } else {
    res.status(400);
    throw new Error("Something went wrong during Find People operation");
  }
});

module.exports = getPeople;
