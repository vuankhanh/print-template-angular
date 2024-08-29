import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatTabGroup, MatTabsModule } from '@angular/material/tabs';
import { AttributeComponent } from "./attribute/attribute.component";
import { InsertComponent } from "./insert/insert.component";
import { AttributeService } from '../../shared/service/attribute.service';
import { filter, map, Subscription } from 'rxjs';

@Component({
  selector: 'dashboard-tool',
  standalone: true,
  imports: [
    MatTabsModule,
    AttributeComponent,
    InsertComponent
  ],
  templateUrl: './tool.component.html',
  styleUrl: './tool.component.scss'
})
export class ToolComponent implements OnInit, OnDestroy {
  @ViewChild('matTabGroup', { static: true }) matTabGroup!: MatTabGroup;

  private subscription: Subscription = new Subscription();
  constructor(
    private attributeService: AttributeService
  ) { }

  ngOnInit(): void {
    this.matTabGroup.selectedIndex = 0;
    this.subscription.add(
      this.attributeService.attribute$.pipe(
        filter((attribute) => attribute !== null),
        map(_ => 1)
      ).subscribe(selectedTab => {
        this.matTabGroup.selectedIndex = selectedTab;
      })
    )
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
