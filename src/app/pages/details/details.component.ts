import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { House } from '../../model/house.model';
import { HousingService } from '../../services/housing.service';
import { TranslatePipe } from '../../pipes/translate.pipe';

@Component({
  selector: 'app-details',
  imports: [TranslatePipe],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss',
})
export class DetailsComponent {
  constructor(
    private route: ActivatedRoute,
    private housingService: HousingService
  ) {}
  houseId!: number;
  house!: House;
  ngOnInit() {
    this.getHouseIdFromRoute();
    this.intializeHouse();
    
  }

  getHouseIdFromRoute() {
    this.houseId = Number(this.route.snapshot.paramMap.get('id'));
  }
  intializeHouse() {
    this.housingService.gethousingbyid(this.houseId).subscribe({
      next: (houseDetalis: House) => {
        this.house = houseDetalis;
        console.log(this.house);
      },
      error: (error: Error) => {
        console.error('Error fetching housing data:', error);
      },
    });
  }
}
