import { Component, OnInit } from '@angular/core';
import { RestaurantService } from '../restaurant.service';
import { IRestaurantModel } from '../interfaces/IRestaurantModel';

@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.css']
})
export class RestaurantsComponent implements OnInit {

    private restaurants: IRestaurantModel[];
    constructor(
        private restaurantService: RestaurantService
    ) { }

	ngOnInit() {
		this.restaurantService.getAll().subscribe(
			res => {
				console.log("got all restaurants");
				this.restaurants = res;
			}
		);
	}

}
