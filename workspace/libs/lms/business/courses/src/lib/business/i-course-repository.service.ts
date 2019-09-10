import { Observable } from 'rxjs';
import { ApiResponse } from '@angularlicious/foundation';

export interface ICourseRepositoryService {
  retrieveLatestCourses<T>(): Observable<ApiResponse<T>>;
}
