import Developer from '../../core/entities/Developer';
import DeveloperRepository from '../../core/repositories/DeveloperRepository';

export default class DeveloperRepositoryMemory implements DeveloperRepository {
  developers: Developer[] = [];

  async create(
    name: string,
    email: string,
    githubProfile: string,
  ): Promise<Developer> {
    const developer = new Developer(
      name,
      email,
      githubProfile,
      (this.developers.length + 1).toString(),
    );

    this.developers.push(developer);

    return Promise.resolve(developer);
  }

  async getByEmail(email: string): Promise<Developer> {
    const developer = this.developers.find(item => item.email === email);
    return Promise.resolve(developer);
  }

  async getByGithubProfile(githubProfile: string): Promise<Developer> {
    const developer = this.developers.find(
      item => item.githubProfile === githubProfile,
    );
    return Promise.resolve(developer);
  }
}
