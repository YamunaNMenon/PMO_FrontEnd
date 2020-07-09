import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ListFilter } from 'src/app/list-filter.pipe';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';
import { PmoUserComponent } from './pmo-user.component';
import { UserService } from 'src/app/service/user.service';
import { User } from 'src/app/models/user';
import { HttpClient } from '@angular/common/http';

describe('PmoUserComponent', () => {
  let component:  PmoUserComponent;
  let fixture: ComponentFixture<PmoUserComponent>;
  let userService: UserService;
  const formBuilder: FormBuilder = new FormBuilder();
  let httpClient: HttpClient;
  
  const newUser: User = {
    id: 1,
    user_id:1,
    firstName: 'Anu',
    lastName: 'Vinu',
    employeeId: '12345',
    projectId: '',
    taskId: '',
    manager_check:''
  };

  const userList = [
    {
      id: 1,
      user_id:1,
      firstName: 'Raju',
      lastName: 'Radha',
      employeeId: '12345',
      projectId: '',
      taskId: '',
      manager_check:''
    },
    {
      id: 2,
      user_id:2,
      firstName: 'Ramu',
      lastName: 'Raghav',
      employeeId: '75489',
      projectId: '',
      taskId: '',
      manager_check:''
    }
  ];
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, ReactiveFormsModule, HttpClientTestingModule],
      declarations: [ PmoUserComponent, ListFilter ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      providers: [UserService, { provide: FormBuilder, useValue: formBuilder }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PmoUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    userService = TestBed.get(UserService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return form as false', () => {
    const controlsInForm = component.formControls;
    controlsInForm.firstName.setValue('');
    component.userForm.controls.firstName.setValue(null);
    fixture.detectChanges();
    component.addPmoUser();
    expect(component.userForm.valid).toBeFalse();
  });

  it('should call add user method', () => {
    component.userForm = formBuilder.group(newUser);
    component.addPmoUser();
    expect(component.submitted).not.toBeFalsy();
  });

  it('should reset form', () => {
    component.resetUserForm();
    expect(component.submitted).toBeFalsy();
  });

  it('should call edit user', () => {
    component.editUser(newUser);
    expect(component.submitButtonText).toEqual('Update');
  });

  it('should call addOrEditUser', () => {
    spyOn(userService, 'addOrEditUser').and.returnValue(of(newUser));
    spyOn(userService, 'getAllUsers').and.returnValue(of(userList));
    component.saveAndEditUser(newUser);
    expect(userService.addOrEditUser).toHaveBeenCalled();
  });

  it('should call delete user', () => {
    spyOn(userService, 'deleteUser').and.returnValue(of(newUser));
    component.deleteUser('1');
    expect(userService.deleteUser).toHaveBeenCalled();
  });

  it('should sort the list with first name', () => {
    component.userList = userList;
    component.sortPmoUserList('firstName');
    expect(component.userList[0].firstName).toEqual('Raju');
  });

  it('should sort the list with last name', () => {
    component.userList = userList;
    component.sortPmoUserList('lastName');
    expect(component.userList[0].lastName).toEqual('Radha');
  });

  it('should sort the list with id', () => {
    component.userList = userList;
    component.sortPmoUserList('id');
    expect(component.userList[0].id).toEqual(1);
  });
});
