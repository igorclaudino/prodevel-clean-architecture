import Developer from "../../entities/Developer";
import EmailAlreadyExistsException from "../../exceptions/EmailAlreadyExistsException";
import GithubProfileAlreadyExistsException from "../../exceptions/GithubProfileAlreadyExistsException";
import DeveloperRepository from "../../repositories/DeveloperRepository";

interface ICreateDeveloper {
  name: string;
  email: string;
  githubProfile: string;
}

export default class CreateDeveloper {
  constructor(private readonly developerRepository: DeveloperRepository) {}

  async execute({
    email,
    githubProfile,
    name,
  }: ICreateDeveloper): Promise<Developer> {
    const developerByEmailExists = await this.developerRepository.getByEmail({
      email,
    });
    if (developerByEmailExists) throw new EmailAlreadyExistsException();
    const developerByGithubProfileExists = await this.developerRepository.getByGithubProfile(
      { githubProfile },
    );
    if (developerByGithubProfileExists)
      throw new GithubProfileAlreadyExistsException();
    return this.developerRepository.create({ name, email, githubProfile });
  }
}
