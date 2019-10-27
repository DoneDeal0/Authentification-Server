const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const similarJobsSchema = new mongoose.Schema({
  title: { type: String }
});

const JobSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    similarJobs: [similarJobsSchema],
    matches: [
      {
        user: {
          type: Schema.Types.ObjectId,
          ref: "User",
          required: true
        }
      }
    ]
  },
  { timestamps: true }
);

const Job = mongoose.model("Job", JobSchema);
module.exports = Job;
