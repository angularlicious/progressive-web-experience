import { Author } from '../authors/author.model';
import { CourseCategory } from './course-category.enum';
import { DocumentReference } from '@angular/fire/firestore';

export abstract class Course {
  author: Author;
  authorId: DocumentReference;
  category: CourseCategory = CourseCategory.Unknown;
  description: string;
  id: string;
  title: string;
}
