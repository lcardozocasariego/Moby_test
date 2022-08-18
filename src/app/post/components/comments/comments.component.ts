import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/service/auth.service';
import { Icoment } from '../../interfaces/user.interface';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
})
export class CommentsComponent implements OnInit, OnDestroy {
  @Input() postID!: number;
  @Output() onEmit: EventEmitter<Date> = new EventEmitter();
  comments: Icoment[] = [];
  displayBasic: boolean = false;

  constructor(private postService: PostService) { }

  notifierSubscription: Subscription = this.postService.subjectNotifier.subscribe(notified => {
    this.initComents();
  });

  ngOnDestroy(): void {
    this.notifierSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.initComents();
  }

  private initComents() {
    this.postService
      .getPostComments(this.postID)
      .subscribe((resp) => {
        this.comments = []
        this.comments = resp
      });
  }

  sendEmmitd(value: Date) {
    this.onEmit.emit(value);
  }

  showDialog() {
    this.displayBasic = true;
  }

  closeModal(event: boolean) {
    this.displayBasic = event;
    this.update()
  }

  update() {
    this.initComents();
  }
}
