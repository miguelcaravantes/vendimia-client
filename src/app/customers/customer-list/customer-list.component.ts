import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { CustomerService } from '../shared/customer.service';
import { Router } from '@angular/router';
import { ConfirmComponent } from '../../shared/ui/confirm/confirm.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent implements OnInit {


  displayedColumns = ['code', 'fullName', 'actions'];
  dataSource: object[] = [];
  constructor(private customerService: CustomerService, private router: Router, private dialog: MatDialog, private toastr: ToastrService) {
  }


  formatCode(code: string) {
    return code.toString().padStart(4, '0');
  }

  fullName(customer) {
    return [customer.firstName, customer.lastName, customer.mothersLastName].filter(c => c).join(' ');
  }

  ngOnInit() {
    this.customerService.getList().subscribe(res => this.dataSource = res);
  }

  goToEdit(item: any) {
    this.router.navigate(['/customers', 'edit', item.id]);
  }

  delete(item: any) {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: '250px',
      data: { title: 'Eliminar', message: '¿Esta seguro que desea eliminar este registro?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.customerService.delete(item.id).subscribe(
          () => {
            this.toastr.success('Registro eliminado con exito');
            this.customerService.getList().subscribe(res => this.dataSource = res);
          },
          error => this.toastr.error('Ocurrio un error al eliminar el registro')
        );
      }
    });
  }
}
