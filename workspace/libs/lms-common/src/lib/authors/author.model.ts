import { AuthorStatus } from './author-status.enum';

export class Author {
  bio: string;
  blog: string;
  dateCreated: Date;
  dateUpdated: Date;
  id: number;
  instagram: string;
  photoUrl: string;
  status: AuthorStatus.NotSet;
  twitter: string;
  userId: string;
  web: string;
}
