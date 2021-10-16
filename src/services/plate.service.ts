import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SortDirection } from '@angular/material/sort';
import { Observable } from 'rxjs';
import { AddPlateFormComponent } from '../components/add-plate-form/add-plate-form.component';
// import { PlateRegisterFormComponent } from 'src/components/Plate-register-form/Plate-register-form.component';
import { Plate } from 'src/models/plate';
import { ResponseModel } from 'src/models/response';
import { MenuComponent } from 'src/views/menu/menu.component';

@Injectable({
  providedIn: 'root'
})
export class PlateService {

  constructor(
    public dialog:MatDialog,
    private http:HttpClient
  ) { }

  readonly PlateURL = `https://localhost:44308/api/Plates/`;
  formDataPlate:Plate = new Plate();
  PlateList: Plate[];  


  openAddPlate() {
    const dialogRef = this.dialog.open(AddPlateFormComponent);
    dialogRef.disableClose = true
  }

  postPlate() {

    const body = {
      Name: this.formDataPlate.name,
      Price: this.formDataPlate.price,
      Description: this.formDataPlate.description,
      RestaurantEmail: JSON.parse(localStorage.getItem('userInfo')).email 
    }

    return this.http.post(this.PlateURL, body);
  }

  deletePlate(id: number) {
    return this.http.delete(`${this.PlateURL}${id}`); 
  }

  refreshPlateList() {
    this.http
      .get<Plate[]>(this.PlateURL)
      .toPromise()
      .then((data) => {
         this.PlateList = data as Plate[]
      });
  }
}
