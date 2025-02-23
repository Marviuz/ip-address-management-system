import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  // TODO: fetch data from database
  private readonly users = [
    {
      userId: 1,
      username: 'john',
      password: 'changeme',
    },
    {
      userId: 2,
      username: 'maria',
      password: 'guess',
    },
  ];

  async findOne(
    username: string,
  ): Promise<(typeof this.users)[number] | undefined> {
    return Promise.resolve(
      this.users.find((user) => user.username === username),
    );
  }
}
