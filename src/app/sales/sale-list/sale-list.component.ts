import { Component, OnInit } from '@angular/core';
import { SaleService } from '../shared/sale.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sale-list',
  templateUrl: './sale-list.component.html',
  styleUrls: ['./sale-list.component.scss']
})
export class SaleListComponent implements OnInit {


  displayedColumns = ['code', 'customerCode', 'fullName', 'total', 'creationDate'];
  dataSource: object[] = [];
  constructor(private saleService: SaleService, private router: Router, private toastr: ToastrService) {
  }


  formatCode(code: string) {
    return code.toString().padStart(4, '0');
  }

  fullName(sale) {
    return [sale.firstName, sale.lastName, sale.mothersLastName].filter(c => c).join(' ');
  }

  ngOnInit() {
    this.saleService.getList().subscribe(res => this.dataSource = res);
  }

  goToEdit(item: any) {
    this.router.navigate(['/sales', 'edit', item.id]);
  }

  
}
