import faker from "faker";
import DeveloperRepositoryMemory from "../../../infra/repositories/DeveloperRepositoryMemory";
import EmailAlreadyExistsException from "../../exceptions/EmailAlreadyExistsException";
import GithubProfileAlreadyExistsException from "../../exceptions/GithubProfileAlreadyExistsException";
import CreateDeveloper from "./CreateDeveloper";

describe("CreateDeveloper", () => {
  it("Should create a developer", async () => {
    const developerRepositoryMemory = new DeveloperRepositoryMemory();
    const createDeveloper = new CreateDeveloper(developerRepositoryMemory);
    const developer = await createDeveloper.execute({
      name: faker.name.firstName(),
      email: faker.internet.email(),
      githubProfile: faker.internet.userName(),
    });
    expect(developer.id).not.toBeUndefined();
    expect(developer.id).not.toBeNull();
  });

  it("Should not create a developer with a e-mail that already exists", async () => {
    const email = faker.internet.email();
    const developerRepositoryMemory = new DeveloperRepositoryMemory();
    const createDeveloper = new CreateDeveloper(developerRepositoryMemory);
    await createDeveloper.execute({
      name: faker.name.firstName(),
      email,
      githubProfile: faker.internet.userName(),
    });
    expect(
      createDeveloper.execute({
        name: faker.name.firstName(),
        email,
        githubProfile: faker.internet.userName(),
      }),
    ).rejects.toThrow(EmailAlreadyExistsException);
  });

  it("Should not create a developer with a github profile that already exists", async () => {
    const githubProfile = faker.internet.userName();
    const developerRepositoryMemory = new DeveloperRepositoryMemory();
    const createDeveloper = new CreateDeveloper(developerRepositoryMemory);
    await createDeveloper.execute({
      name: faker.name.firstName(),
      email: faker.internet.email(),
      githubProfile,
    });
    expect(
      createDeveloper.execute({
        name: faker.name.firstName(),
        email: faker.internet.email(),
        githubProfile,
      }),
    ).rejects.toThrow(GithubProfileAlreadyExistsException);
  });
});
