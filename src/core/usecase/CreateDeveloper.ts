import Developer from "../entities/Developer"
import EmailAlreadyExistsException from "../exceptions/EmailAlreadyExistsException";
import GithubProfileAlreadyExistsException from "../exceptions/GithubProfileAlreadyExistsException";
import DeveloperRepository from "../repositories/DeveloperRepository";

export default class CreateDeveloper{
  developerRepository: DeveloperRepository;
  
  constructor(developerRepository: DeveloperRepository){
    this.developerRepository = developerRepository;
  }

  async execute(name: string, email: string, githubProfile: string): Promise<Developer>{
    let foundedDeveloper = await this.developerRepository.getByEmail(email);
    if(foundedDeveloper) throw new EmailAlreadyExistsException();
    foundedDeveloper = await this.developerRepository.getByGithubProfile(githubProfile);
    if(foundedDeveloper) throw new GithubProfileAlreadyExistsException();
    const developer = new Developer(name, email, githubProfile);
    return this.developerRepository.create(developer.name, developer.email, developer.githubProfile);
  }
}