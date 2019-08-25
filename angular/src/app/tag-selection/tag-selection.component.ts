import { Component, OnInit } from '@angular/core';
import { TagSelectionService } from '../services/tag-selection.service';
import { ProfileService } from '../services/profile.service';
import { Location } from '@angular/common';
import { RecommendationListService } from '../services/recommendation-list.service';

@Component({
    selector: 'app-tag-selection',
    templateUrl: './tag-selection.component.html',
    styleUrls: ['./tag-selection.component.scss']
})
export class TagSelectionComponent implements OnInit {
    private tagListID: number;
    userID: number;
    tagList: any;
    newList = [];

    constructor(private tagSelectionService: TagSelectionService,
        private recommendationListService: RecommendationListService,
        private data: ProfileService,
        private location: Location) {
    }

    ngOnInit() {
        this.userID = 1;
        this.tagSelectionService.getAllTags().subscribe(
            res => this.tagList = res
        );
    }

    checkValidation(f) {
        let set = new Set();
        for (let key in f.value) {
            let value = f.value[key];
            let num = +value;
            set.add(num);
        }
        if (typeof this.tagList !== 'undefined') {
            if (set.size < this.tagList.length) {
                return false;
            }
            return true;
        }
    }

    onSubmit(f) {
        this.newList = [];
        console.log(f.value);
        for (let key in f.value) {
            let value = f.value[key];
            let num = +value;
            this.newList.push(num);
        }
        console.log('get new list from user in tagSelection edit: ', this.newList);
        if (this.userID > 0) {
            this.data.getProfileByFoodieID(this.userID).subscribe(data => {
                this.tagListID = data.tagListID;
                if (this.tagListID !== null) {
                    this.tagSelectionService.updateTagPriorityList(this.userID, this.newList);
                    this.recommendationListService.updateRecommendationList(this.newList, this.tagListID);
                    location.reload();
                } else {
                    console.log('you can not edit tagList, tagList does not exist');
                }
            });
        }
    }

}
