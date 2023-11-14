import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"
import { projectsService } from "./ProjectsService.js"

class SprintsService {
  async getSprintsByProjectId(projectId, userId) {
    await projectsService.getProjectById(projectId, userId)
    const sprints = await dbContext.Sprints.find({ projectId })
    return sprints
  }
  async createSprint(sprintData) {
    const sprint = await dbContext.Sprints.create(sprintData)
    return sprint
  }
  async destroySprint(sprintId, userId) {
    const sprint = await dbContext.Sprints.findById(sprintId)
    if (!sprint) { throw new BadRequest(`Invalid id: ${sprintId}`) }
    if (sprint.creatorId.toString() != userId) { throw new Forbidden("NOT YOUR SPRINT") }
    await sprint.remove()
    return `${sprint.name} has been deleted!`
  }
}

export const sprintsService = new SprintsService()