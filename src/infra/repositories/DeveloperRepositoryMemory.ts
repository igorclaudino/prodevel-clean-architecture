import Developer from "../../core/entities/Developer";
import DeveloperRepository from "../../core/repositories/DeveloperRepository";
import {
  ICreateDeveloper,
  IGetByEmailDeveloper,
  IGetByGithubProfile,
} from "../../core/repositories/DeveloperRepository/types";

export default class DeveloperRepositoryMemory implements DeveloperRepository {
  developers: Developer[] = [];

  async create({
    name,
    email,
    githubProfile,
  }: ICreateDeveloper): Promise<Developer> {
    const developer: Developer = {
      name,
      email,
      githubProfile,
      id: (this.developers.length + 1).toString(),
    };

    this.developers.push(developer);

    return Promise.resolve(developer);
  }

  async getByEmail({ email }: IGetByEmailDeveloper): Promise<Developer> {
    const developer = this.developers.find(item => item.email === email);
    return Promise.resolve(developer);
  }

  async getByGithubProfile({
    githubProfile,
  }: IGetByGithubProfile): Promise<Developer> {
    const developer = this.developers.find(
      item => item.githubProfile === githubProfile,
    );
    return Promise.resolve(developer);
  }
}
