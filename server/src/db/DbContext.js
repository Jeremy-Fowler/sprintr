import mongoose from 'mongoose'
import { AccountSchema } from '../models/Account'
import { ValueSchema } from '../models/Value'
import { ProjectSchema } from '../models/Project.js';
import { SprintSchema } from '../models/Sprint.js';

class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);
  Projects = mongoose.model('Project', ProjectSchema)
  Sprints = mongoose.model('Sprint', SprintSchema)
}


export const dbContext = new DbContext()
