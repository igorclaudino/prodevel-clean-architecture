import Developer from "../../entities/Developer";
import {
  ICreateDeveloper,
  IGetByEmailDeveloper,
  IGetByGithubProfile,
} from "./types";

export default interface DeveloperRepository {
  create({ name, email, githubProfile }: ICreateDeveloper): Promise<Developer>;
  getByEmail({ email }: IGetByEmailDeveloper): Promise<Developer>;
  getByGithubProfile({
    githubProfile,
  }: IGetByGithubProfile): Promise<Developer>;
}
