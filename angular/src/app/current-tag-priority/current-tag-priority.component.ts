import { Component, OnInit } from '@angular/core';
import { TagSelectionService } from '../services/tag-selection.service';
import { ProfileService } from '../services/profile.service';

@Component({
    selector: 'app-current-tag-priority',
    templateUrl: './current-tag-priority.component.html',
    styleUrls: ['./current-tag-priority.component.scss']
})
export class CurrentTagPriorityComponent implements OnInit {
    tagPriList: string[] = [];
    priorityList: number[] = [];
    tagList: any;
    userID: number;

    constructor(private profileService: ProfileService,
        private tagSelectionService: TagSelectionService,
    ) { }

    ngOnInit() {
        this.userID = 1;
        if (this.userID > 0) {
            this.tagSelectionService.getAllTags().subscribe(
                res => {
                    this.tagList = res;
                    this.profileService.getFoodieTagListByFoodieID(this.userID).subscribe(
                        response => {
                            this.priorityList = response.tagList;
                            for (let i = 0; i < this.tagList.length; i++) {
                                let message: string = this.tagList[i]['tagName'] + ': ' + this.priorityList[i];
                                console.log(message);
                                this.tagPriList.push(message);
                            }
                            console.log(this.tagPriList);
                        });
                });
        } else {
            console.log('cannot get user id in currentTag');
        }
    }

}
