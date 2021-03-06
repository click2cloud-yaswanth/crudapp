import { Component,  OnInit } from '@angular/core';
import { Employee } from 'src/app/model/employee';
import { HttpClient } from '@angular/common/http';
import { EmployeeService } from 'src/app/service/employee.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  employeearray: any = [];
  constructor(private http: HttpClient, private empservice: EmployeeService) {}
  emp: any = [];

  public ide: number = 0;
  public namee: string = '';
  public emaile: string = '';
  public nume: number = 0;

  public dummy: boolean = false;

  ngOnInit(): void {
    this.empservice.getMethod().subscribe((response) => {
      this.setrecipes(response);
    });
  }
  onSubmit(name: any, emailid: any, salary: any) {
    if (name.value == '' || emailid.value == '' || salary.value == '') {
      alert('Please Enter the required details');
    }
    const employee: Employee = {
      full_name: name.value,
      employee_code: emailid.value,
      mobilenum: salary.value,
    };
    this.http
      .post('http://127.0.0.1:8000/api/employee/', employee)
      .subscribe((response) => {
        console.log(response);
      });
    name.value = '';
    emailid.value = '';
    salary.value = '';
    this.ngOnInit();
  }

  onEdit(eleid: number) {
    this.ide = this.employeearray[eleid].id;
    this.namee = this.employeearray[eleid].full_name;
    this.emaile = this.employeearray[eleid].employee_code;
    this.nume = this.employeearray[eleid].mobilenum;
  }

  onDelete(eleid: number) {
    const n: number = this.employeearray[eleid].id;
    this.http
      .delete('http://127.0.0.1:8000/api/employee/' + n + '/')
      .subscribe((res) => {
        console.log(res);
      });
    this.ngOnInit();
  }

  onUpdate(name: any, emailid: any, salary: any) {
    const employee: Employee = {
      full_name: name.value,
      employee_code: emailid.value,
      mobilenum: salary.value,
    };
    this.http
      .put('http://127.0.0.1:8000/api/employee/' + this.ide + '/', employee)
      .subscribe((res) => {
        console.log(res);
      });
    this.ngOnInit();
  }
  setrecipes(recipe: any) {
    const resultarray = Object.keys(recipe).map((index) => {
      let person = recipe[index];
      return person;
    });
    this.employeearray = resultarray;
  }
}
