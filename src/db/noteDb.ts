import { model, Schema } from "mongoose";

interface Type {
  _id?: Object;
  title: string;
  content: string;
}

const noteSchema = new Schema<Type>(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Note = model<Type>("Note", noteSchema);
export { Type, Note };
