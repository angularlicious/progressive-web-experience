import { Author } from '../authors/author.model';
import { CourseCategory } from './course-category.enum';

export abstract class Course {
  id: number;
  title: string;
  description: string;
  category: CourseCategory = CourseCategory.Unknown;
  author: Author;
}
