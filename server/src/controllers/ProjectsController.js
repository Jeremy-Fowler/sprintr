import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { projectsService } from "../services/ProjectsService.js";
import { sprintsService } from "../services/SprintsService.js";

export class ProjectsController extends BaseController {
  constructor () {
    super('api/projects')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getProjectsByUserId)
      .get('/:projectId', this.getProjectById)
      .get('/:projectId/sprints', this.getSprintsByProjectId)
      .post('', this.createProject)
      .delete('/:projectId', this.destroyProject)
  }


  async getProjectsByUserId(req, res, next) {
    try {
      const userId = req.userInfo.id
      const projects = await projectsService.getProjects(userId)
      return res.send(projects)
    } catch (error) {
      next(error)
    }
  }
  async getProjectById(req, res, next) {
    try {
      const projectId = req.params.projectId
      const userId = req.userInfo.id
      const project = await projectsService.getProjectById(projectId, userId)
      return res.send(project)
    } catch (error) {
      next(error)
    }
  }
  async getSprintsByProjectId(req, res, next) {
    try {
      const projectId = req.params.projectId
      const userId = req.userInfo.id
      const sprints = await sprintsService.getSprintsByProjectId(projectId, userId)
      return res.send(sprints)
    } catch (error) {
      next(error)
    }
  }
  async createProject(req, res, next) {
    try {
      const projectData = req.body
      projectData.creatorId = req.userInfo.id
      const project = await projectsService.createProject(projectData)
      return res.send(project)
    } catch (error) {
      next(error)
    }
  }

  async destroyProject(req, res, next) {
    try {
      const projectId = req.params.projectId
      const userId = req.userInfo.id
      const message = await projectsService.destroyProject(projectId, userId)
      return res.send(message)
    } catch (error) {
      next(error)
    }
  }
}