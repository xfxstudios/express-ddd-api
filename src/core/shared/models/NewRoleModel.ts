import { Schema, Document } from 'mongoose';
import mongoose from 'mongoose';

interface iNewRoleModel extends Document {
  name: string
  description: string
}

const NewRoleSchema = new Schema( {
  name: {type: String,require: true},
  description: {type: String,require: true},
}, {
  timestamps: true
})

const mNewRoleModel = mongoose.model<iNewRoleModel>('nrrole', NewRoleSchema)

export default mNewRoleModel