import { Component, OnInit} from '@angular/core';
import { ProfileService } from '../profile.service';
import { Router  , ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { NumberValueAccessor } from '@angular/forms/src/directives';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  users: Object;
  id: Number; 

  constructor(private data: ProfileService, private route: ActivatedRoute, private authService: AuthService) { }

  ngOnInit() {
      this.id = parseInt(this.userID);
      this.data.getProfileByFoodieID(this.id).subscribe(data => {
        console.log(this.userID);
        console.log(this.id);
        this.users = data;
        console.log(this.users);
      }
    );
  }

  get userID():string {
    return this.authService.userID;
  }

  set userID(value: string) {
    this.authService.userID = value; 
  }
}
