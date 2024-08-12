import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UserloginService } from '../services/userlogin.service';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss'
})

export class HomepageComponent implements OnInit {
  empData = {
    name: '',
    empId: '',
    email: '',
    designation: '',
    department: '',
    isOrganizer: false
  };

  employees: any[] = [];
  itemsPerPage = 2;
  currentPage = 1;
  totalItems = 0;
  searchKey = '';



  constructor(private userService: UserloginService, private toastr: ToastrService) { }

  ngOnInit() {
    this.listEmployee();
  }

  addEmployee() {
    this.userService.addEmployee(this.empData).subscribe({
      next: (response) => {
        this.toastr.success('Employee added successfully!');
        console.log(response);
      },
      error: (error) => {
        this.toastr.error('Failed to add employee. Please try again.');
        console.error(error);
      }
    });
  }


  listEmployee(): void {
    const order = -1;
    const payload = {
      ...(this.searchKey ? { searchKey: this.searchKey } : {})
    };

    this.userService.listEmployee(order, this.itemsPerPage, this.currentPage, payload).subscribe((response: any) => {
      this.employees = response.data.employeeData;
      this.totalItems = response.data.totalCount;
    });
  }

}