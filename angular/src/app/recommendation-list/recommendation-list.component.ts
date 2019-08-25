import { Component, OnInit } from '@angular/core';
import { IRestaurantModel } from '../interfaces/IRestaurantModel';
import { RecommendationListService } from '../services/recommendation-list.service';
import { RestaurantService } from '../services/restaurant.service';
import { AlgorithmService } from '../services/algorithm.service';
import { DataService } from '../services/data.service';
import { Router } from '@angular/router';
@Component({
    selector: 'app-recommendation-list',
    templateUrl: './recommendation-list.component.html',
    styleUrls: ['./recommendation-list.component.scss']
})
export class RecommendationListComponent implements OnInit {
    private restaurantIdList: number[];
    public recommendationList: IRestaurantModel[] = [];
    private userID: number;
    private tagListIDByUser: number;
    private tagList: number[] = [];
    private restaurantDetailUrl = 'restaurants/';
    // for testing
    public newList: number[] = [];

    // tslint:disable-next-line: no-input-rename
    // @Input ('isChange') isChange = false;
    isChange: boolean;
    // tslint:disable-next-line:no-input-rename
    // @Input ('newList') newList: any = [];

    constructor(private recommendationListService: RecommendationListService,
        private restaurantService: RestaurantService,
        private algorithmService: AlgorithmService,
        private router: Router,
        private dataService: DataService) { }

    ngOnInit() {
        this.userID = 1;
        // if (!this.isChange) {
        console.log('get submit from filter in recommendList: ', this.isChange);
        console.log('get new tagList from filter in recommendList: ', this.newList);
        this.recommendationListService.getTagListId(this.userID).subscribe(
            res => {
                console.log('exists user taglist: ', res);
                this.tagListIDByUser = res['tagListID'];
                this.tagList = res['tagList'];
                this.recommendationListService.getRecommendationList(this.tagListIDByUser).subscribe(
                    response => {
                        if (response !== null) {
                            console.log('exists recommend list: ', response);
                            this.restaurantIdList = response['restaurantList'];
                            console.log('get list: ', this.restaurantIdList);
                            this.getRestaurant();
                            console.log('final get the recommendationList: ', this.recommendationList);
                        } else {
                            this.getRecommendRestaurantIdList();
                            this.getRestaurant();
                            console.log('get list when you have no recommendationList:', this.restaurantIdList);
                            this.recommendationListService.createRecommendationList(this.tagListIDByUser, this.restaurantIdList);
                        }
                    });
            });
    }

    getRestaurant() {
        console.log('restIdList in help func: ', this.restaurantIdList);
        if (this.restaurantIdList.length > 0) {
            for (let each of this.restaurantIdList) {
                this.restaurantService.getByID(+each).subscribe(
                    result => this.recommendationList.push(result)
                );
            }
        }
    }

    getRecommendRestaurantIdList() {
        console.log('tagList in help func:', this.tagList);
        this.restaurantIdList = this.algorithmService.getRecommandationByTaglist(this.tagList);
        console.log('restaurantIdList got from algo:', this.restaurantIdList);
    }

    click(rID) {
        var nextStationUrl = this.restaurantDetailUrl + rID;
        this.router.navigateByUrl(nextStationUrl);
    }

}
