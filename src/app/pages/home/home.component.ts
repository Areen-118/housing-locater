import { Component, HostListener } from '@angular/core';
import { HousingService } from '../../services/housing.service';
import { House } from '../../model/house.model';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NotFoundComponent } from "../not-found/not-found.component";
import { TranslatePipe } from '../../pipes/translate.pipe';
import { I18nService } from '../../services/i18n.service';

@Component({
  selector: 'app-home',
  imports: [RouterLink, FormsModule, NotFoundComponent,TranslatePipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  isSearchMode: boolean = false;
  housingList: House[] = [];
  house!: House;
  searchCity: string='' ;
  constructor(private housingService: HousingService, private router: Router,private langService :I18nService) {}
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
          this.isSearchMode = true;
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
  changeLanguage(lang: 'en' | 'ar') {
   this.langService.loadTranslations(lang);
   
  }
}