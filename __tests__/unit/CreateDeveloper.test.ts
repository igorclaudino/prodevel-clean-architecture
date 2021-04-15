import faker from 'faker';
import EmailAlreadyExistsException from '../../src/core/exceptions/EmailAlreadyExistsException';
import GithubProfileAlreadyExistsException from '../../src/core/exceptions/GithubProfileAlreadyExistsException';
import CreateDeveloper from '../../src/core/usecase/CreateDeveloper';
import DeveloperRepositoryMemory from '../../src/infra/repositories/DeveloperRepositoryMemory';

describe('CreateDeveloper', () => {
  test('Should create a developer', async () => {
    const developerRepositoryMemory = new DeveloperRepositoryMemory();
    const createDeveloper = new CreateDeveloper(developerRepositoryMemory);
    const developer = await createDeveloper.execute(
      faker.name.firstName(),
      faker.internet.email(),
      faker.internet.userName(),
    );
    expect(developer.id).not.toBeUndefined();
    expect(developer.id).not.toBeNull();
  });

  test('Should not create a developer with a e-mail that already exists', async () => {
    const email = faker.internet.email();
    const developerRepositoryMemory = new DeveloperRepositoryMemory();
    const createDeveloper = new CreateDeveloper(developerRepositoryMemory);
    await createDeveloper.execute(
      faker.name.firstName(),
      email,
      faker.internet.userName(),
    );
    expect(
      createDeveloper.execute(
        faker.name.firstName(),
        email,
        faker.internet.userName(),
      ),
    ).rejects.toThrow(EmailAlreadyExistsException);
  });

  test('Should not create a developer with a github profile that already exists', async () => {
    const githubProfile = faker.internet.userName();
    const developerRepositoryMemory = new DeveloperRepositoryMemory();
    const createDeveloper = new CreateDeveloper(developerRepositoryMemory);
    await createDeveloper.execute(
      faker.name.firstName(),
      faker.internet.email(),
      githubProfile,
    );
    expect(
      createDeveloper.execute(
        faker.name.firstName(),
        faker.internet.email(),
        githubProfile,
      ),
    ).rejects.toThrow(GithubProfileAlreadyExistsException);
  });
});
