import { AuthorStatus } from './author-status.enum';

export class Author {
  id: number;
  name: string;
  bio: string;
  email: string;
  twitter: string;
  web: string;
  instagram: string;
  blogUrl: string;
  photoUrl: string;
  status: AuthorStatus.NotSet;

  constructor(name: string) {
    this.name = name;
  }
}
