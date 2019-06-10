import { Component, OnInit, Input } from '@angular/core';
import { TagSelectionService } from '../services/tag-selection.service';
import { ProfileService } from '../services/profile.service';
import { AuthService } from '../services/auth.service';

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

  //@Input('userID') userID = 0;

  constructor(private profileService: ProfileService,
              private tagSelectionService: TagSelectionService,
              private auth: AuthService) {
                this.auth.getSession().subscribe(data => {
                  this.userID = data.userID;
                  console.log("profile: " + JSON.stringify(data)); 
                })
               }

  ngOnInit() {
    this.tagSelectionService.getAllTags().subscribe(
      res => {
        this.tagList = res;
        //console.log(this.tagList);
        this.profileService.getFoodieTagListByFoodieID(this.userID).subscribe(
          response => {
            this.priorityList = response.tagList;
            for (let i = 0; i < this.tagList.length; i++) {
              let message: string = this.tagList[i]['tagName'] + ": " + this.priorityList[i];
              console.log(message);
              this.tagPriList.push(message);
            }
            console.log(this.tagPriList);
        });
    });
  }

}
