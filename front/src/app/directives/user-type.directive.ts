import { Directive, Input, OnDestroy, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { User } from '../models/user.model';
import { Store } from '@ngrx/store';
import { AppState } from '../store/types';

@Directive({
  selector: '[appUserType]'
})
export class UserTypeDirective implements OnInit, OnDestroy {
  @Input('appUserType') type!: string;
  @Input('appUserTypeElse') elseTemplate?: TemplateRef<any>;

  user: Observable<null | User>;
  userSub!: Subscription;

  constructor(private store: Store<AppState>,
              private templateRef: TemplateRef<any>,
              private viewContainer: ViewContainerRef) {
    this.user = store.select(state => state.users.user);
  }

  ngOnInit() {
    this.userSub = this.user.subscribe(user => {
      this.viewContainer.clear();

      if ((user && this.type === 'user') || (!user && this.type === 'anon')) {
        this.viewContainer.createEmbeddedView(this.templateRef);
      } else if (this.elseTemplate) {
        this.viewContainer.createEmbeddedView(this.elseTemplate);
      }
    });
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}
