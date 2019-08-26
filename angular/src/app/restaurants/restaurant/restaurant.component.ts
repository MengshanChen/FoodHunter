import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RestaurantService } from '../../restaurant.service';
import { IRestaurantModel } from '../../interfaces/IRestaurantModel';

@Component({
    selector: 'app-restaurant',
    templateUrl: './restaurant.component.html',
    styleUrls: ['./restaurant.component.css']
})
export class RestaurantComponent implements OnInit {
    private detail: IRestaurantModel;

    constructor(
        private restaurantService: RestaurantService,
        private route: ActivatedRoute
    ) { }

    ngOnInit() {
        this.restaurantService.getByID(this.route.snapshot.params.rID).subscribe(
            res => {
                console.log("got one restaurant");
                this.detail = res;
            }
        );
    }

}