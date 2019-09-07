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

  constructor(name: string) {
    this.name = name;
  }
}
