import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../services/profile.service';
import { IFavoriteListModel } from '../interfaces/IFavoriteListModel';


@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
    userID: number;
    userName: string;
    emailAddress: string;
    favoriteListID: number;
    favoriateList: IFavoriteListModel;
    restaurantIDList: number[] = [];
    avatarPicture: string;

    constructor(private profileService: ProfileService) { }

    ngOnInit() {
        this.userID = 1;
        this.emailAddress = "data.emailAddress";
        this.userName = "data.userName";
        console.log('user of profile: ', this.userID);
        this.profileService.getProfileByFoodieID(this.userID).subscribe(
            foodieinfo => this.avatarPicture = foodieinfo.avatar
        );
    }

}
