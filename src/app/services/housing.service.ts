import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { House } from '../model/house.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HousingService {

  constructor( private http:HttpClient) { }
  getallhousing(): Observable<House[]> {
    return this.http.get<House[]>('http://localhost:3000/locations');
  }
  gethousingbyid(id: number): Observable<House> {
    return this.http.get<House>(`http://localhost:3000/locations/${id}`);
}

}