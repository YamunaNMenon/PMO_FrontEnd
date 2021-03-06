import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { HttpClient} from '@angular/common/http';
import { environment } from '../../environments/environment';
import { User } from '../models/user';
import { UserServiceURLS } from '../constants/serviceURL';

const baseUrl = environment.apiUrl;
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }
   /**
   * Adds edit user
   * @param user USER
   * @returns editUser result
   */
  addOrEditUser(user: User): Observable<any> {
    const addEditUserUrl = baseUrl + UserServiceURLS.SAVE_OR_UPDATE;
    return this.http.post<User>(addEditUserUrl, user);
  }

  /**
   * Gets all users
   * @returns all users
   */
  getAllUsers(): Observable<any>{
    const getAllUsersUrl = baseUrl + UserServiceURLS.GET_ALL_USERS;
    return this.http.get(getAllUsersUrl);
  }

  /**
   * Deletes user
   * @param id ID
   */
  deleteUser(id: string): Observable<any>{
    const deleteUserUrl = baseUrl + UserServiceURLS.DELETE_USER;
    return this.http.delete(`${deleteUserUrl}/${id}`);
  }

}
