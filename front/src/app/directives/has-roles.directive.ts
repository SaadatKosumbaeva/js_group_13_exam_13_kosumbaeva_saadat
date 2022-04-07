import { Directive, Input, OnDestroy, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { User } from '../models/user.model';
import { Store } from '@ngrx/store';
import { AppState } from '../store/types';

@Directive({
  selector: '[appHasRoles]'
})
export class HasRolesDirective implements OnInit, OnDestroy {
  @Input('appHasRoles') roles!: string[];
  @Input('appHasRolesElse') elseTemplate?: TemplateRef<any>;

  user: Observable<null | User>;
  userSub!: Subscription;

  constructor(private store: Store<AppState>,
              private templateRef: TemplateRef<any>,
              private viewContainer: ViewContainerRef) {
    this.user = store.select(state => state.users.user);
  }

  ngOnInit(): void {
    this.userSub = this.user.subscribe(user => {
      this.viewContainer.clear();

      if (user && this.roles.includes(user.role)) {
        this.viewContainer.createEmbeddedView(this.templateRef);
      } else if (this.elseTemplate) {
        this.viewContainer.createEmbeddedView(this.elseTemplate);
      }
    });
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
}
