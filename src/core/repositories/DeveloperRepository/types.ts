export interface ICreateDeveloper {
  name: string;
  email: string;
  githubProfile: string;
}

export interface IGetByEmailDeveloper {
  email: string;
}

export interface IGetByGithubProfile {
  githubProfile: string;
}
