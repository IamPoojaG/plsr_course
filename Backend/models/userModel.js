import mongoose from 'mongoose';

const modelSchema = mongoose.Schema(
  {
    title: {
      type: String,
    },
    class_level: {
      type: String,
    },
    pricing: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Course = mongoose.model('Course', modelSchema);
export default Course;
