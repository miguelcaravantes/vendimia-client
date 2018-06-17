import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ItemService } from '../shared/item.service';
import { Router } from '@angular/router';
import { ConfirmComponent } from '../../shared/ui/confirm/confirm.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss']
})
export class ItemListComponent implements OnInit {


  displayedColumns = ['code', 'fullName', 'actions'];
  dataSource: object[] = [];
  constructor(private itemService: ItemService, private router: Router, private dialog: MatDialog, private toastr: ToastrService) {
  }


  formatCode(code: string) {
    return code.toString().padStart(4, '0');
  }

  ngOnInit() {
    this.itemService.getList().subscribe(res => this.dataSource = res);
  }

  goToEdit(item: any) {
    this.router.navigate(['/items', 'edit', item.id]);
  }

  delete(item: any) {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: '250px',
      data: { title: 'Eliminar', message: '¿Esta seguro que desea eliminar este registro?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.itemService.delete(item.id).subscribe(
          () => {
            this.toastr.success('Registro eliminado con exito');
            this.itemService.getList().subscribe(res => this.dataSource = res);
          },
          error => this.toastr.error('Ocurrio un error al eliminar el registro')
        );
      }
    });
  }
}
