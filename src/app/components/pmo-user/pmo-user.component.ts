import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-pmo-user',
  templateUrl: './pmo-user.component.html',
  styleUrls: ['./pmo-user.component.scss']
})
export class PmoUserComponent implements OnInit {

submitted = false;
userForm: FormGroup;
submitButtonText = 'Add';
user: User;
userList: User[];
userSearch: string;
searchType = 'user';

/**
 * Creates an instance of user component.
 * @param formBuilder FormBuilder
 * @param userService UserService
 */
constructor(private formBuilder: FormBuilder, private userService: UserService) { }

/**
 * init function
 */
ngOnInit(): void { 
  this.getAllPmoUsers();
  this.userForm = this.formBuilder.group({
    id: [],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    employeeId: ['', Validators.required],
    projectId: '',
    taskId: ''
  });
}

/**
 * Retrieve form values
 */
get formControls(): any {
  return this.userForm.controls;
}


/**
* Determines whether user submit o
* @returns user submit
*/
addPmoUser(): any{
this.submitted = true;
if (this.userForm.invalid) {
  return;
} else {
  const user: User = this.userForm.value;
  this.saveAndEditUser(user);
}
}

/**
* Reset form values
*/
resetUserForm(): void {
this.submitButtonText = 'Add';
this.submitted = false;
this.userForm.reset();
}

/**
* Save or edit  pmo user details
* @param user User
*/
saveAndEditUser(user: User): void{
this.userService.addOrEditUser(user)
  .subscribe(res => {
    this.getAllPmoUsers();
    this.resetUserForm();
  });
}

/**
* Gets all PmoUserDetails
*/
getAllPmoUsers(): void{
this.userService.getAllUsers()
  .subscribe(data => {
    this.userList = data;
  });
}

/**
* Edits user
* @param user User
*/
editUser(user: User): void{
this.user = user;
this.submitButtonText = 'Update';
const userEdit = {
  id: user.id,
  firstName: user.firstName,
  lastName: user.lastName,
  employeeId: user.employeeId,
  projectId: '',
   taskId: ''
};
this.userForm.setValue(userEdit);
}

/**
* Deletes user User
* @param id Id
*/
deleteUser(id: string): void{
this.userService.deleteUser(id)
  .subscribe(data => {
    this.getAllPmoUsers();
    this.resetUserForm();
  });
}

/**
* Sorts user list
* @param paramName SortBy
*/
sortPmoUserList(paramName: string): void{
switch (paramName) {
  case 'firstName':
    this.userList = this.userList.sort((a, b) => {
      return a.firstName < b.firstName ? -1 : 1;
    });
    break;
  case 'lastName':
    this.userList = this.userList.sort((a, b) => {
      return a.lastName < b.lastName ? -1 : 1;
    });
    break;
  case 'id':
    this.userList = this.userList.sort((a, b) => {
      return a.id < b.id ? -1 : 1;
    });
    break;
}
}
  
}
