import { Component, OnDestroy, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AuthService } from 'src/app/auth/service/auth.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'src/app/auth/interfaces/user.interface';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  displayBasic: boolean = false;
  items: MenuItem[] = [];
  data!: User;
  activeSection = 'Home';
  userLogued!: User;
  getUserSubscriber!: Subscription;

  constructor(
    private route: Router,
    private location: Location,
    private authService: AuthService
  ) {}

  ngOnDestroy(): void {
    this.getUserSubscriber.unsubscribe();
  }

  ngOnInit() {
    this.initMenuItems();
    this.setSectionText();
    this.setUserLogued();
  }

  private setUserLogued() {
    this.getUserSubscriber = this.authService.getUserLogued.subscribe(
      (value) => {
        this.userLogued = value!;
      }
    );
  }

  private initMenuItems() {
    this.items = [
      {
        label: 'My acount',
        icon: 'pi pi-fw pi-user',
        style: { 'margin-left': 'auto' },
        items: [
          {
            label: 'Edit',
            icon: 'pi pi-fw pi-user-edit',
            command: () => {
              this.goProfile();
            },
          },
          {
            label: 'Log out',
            icon: 'pi pi-fw pi-power-off',
            command: () => {
              this.logOut();
            },
          },
        ],
      },
    ];
  }

  private setSectionText() {
    this.location.onUrlChange((path) => {
      switch (path) {
        case '/posts':
          this.activeSection = 'Home';
          break;
        case '/profile':
          this.activeSection = 'Profile';
          break;
        case '/404':
          this.activeSection = 'Error :C';
          break;
        default:
          const postID = this.getPostIDbyURL(path);
          this.activeSection = `Post id: ${postID}`;
          break;
      }
    });
  }

  getPostIDbyURL(path: string) {
    const id = path.split('/');
    return id.pop();
  }

  goProfile() {
    this.route.navigate(['/profile']);
  }

  goHome() {
    this.route.navigate(['/posts']);
  }

  closeModal(_: boolean) {
    this.displayBasic = false;
  }

  logOut() {
    this.authService.fireLogOut();
  }
}
