import { Component, HostListener } from '@angular/core';
import { HousingService } from '../../services/housing.service';
import { House } from '../../model/house.model';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  imports: [RouterLink,FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  housingList: House[] = [];
  house!: House;
  searchCity: string='' ;
  constructor(private housingService: HousingService, private router: Router) {}
  ngOnInit() {
    this.loadHousingList();
   
  }
  loadHousingList() {
    this.housingService.getallhousing().subscribe({
      next: (housingData: House[]) => {
        this.housingList = housingData;
      },
      error: (error: Error) => {
        console.error('Error fetching housing data:', error);
      },
    });
  }
  onHouseClick(houseId: number) {
    this.router.navigateByUrl(`/details/${houseId}`);
  }
  @HostListener('input', ['$event.target.value'])
  onCitySearch(searchCity: string) {
    if (searchCity) {
      this.housingService.getallhousing().subscribe({
        next: (cityData: House[]) => {
          this.housingList = cityData;
          this.housingList = this.housingList.filter((house) =>
            house.city.toLowerCase().includes(searchCity.toLowerCase())
          );
        },
        error: (error: Error) => {
          console.error('Error fetching housing data by city:', error);
        },
      });
    }
    else {
      this.loadHousingList();
    }
  }
}