import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"

class ProjectsService {

  async getProjects(userId) {
    const projects = await dbContext.Projects.find({ creatorId: userId }).populate('creator', 'name picture')
    return projects
  }

  async getProjectById(projectId, userId) {
    const project = await dbContext.Projects.findById(projectId).populate('creator', 'name picture')
    if (!project) { throw new BadRequest(`Invalid id: ${projectId}`) }
    if (project.creatorId.toString() != userId) { throw new Forbidden("NOT YOUR PROJECT") }
    return project
  }
  async createProject(projectData) {
    const project = await dbContext.Projects.create(projectData)
    await project.populate('creator', 'name picture')
    return project
  }

  async destroyProject(projectId, userId) {
    const project = await this.getProjectById(projectId, userId)
    await project.remove()
    return `${project.name} has been deleted!`
  }
}

export const projectsService = new ProjectsService()