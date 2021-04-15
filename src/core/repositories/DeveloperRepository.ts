import Developer from '../entities/Developer';

export default interface DeveloperRepository {
  create(
    name: string,
    email: string,
    githubProfile: string,
  ): Promise<Developer>;
  getByEmail(email: string): Promise<Developer>;
  getByGithubProfile(githubProfile: string): Promise<Developer>;
}
