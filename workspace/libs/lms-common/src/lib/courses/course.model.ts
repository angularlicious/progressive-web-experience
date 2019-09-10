import { Author } from '../authors/author.model';
import { CourseCategory } from './course-category.enum';

export abstract class Course {
  author: Author;
  authorId: number;
  category: CourseCategory = CourseCategory.Unknown;
  description: string;
  id: string;
  title: string;
}
