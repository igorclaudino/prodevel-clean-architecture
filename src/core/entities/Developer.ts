export default class Developer {
  id?: string;

  name: string;

  email: string;

  githubProfile: string;

  constructor(name: string, email: string, githubProfile: string, id?: string) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.githubProfile = githubProfile;
  }
}
