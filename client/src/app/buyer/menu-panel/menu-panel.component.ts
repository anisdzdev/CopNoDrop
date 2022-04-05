import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu-panel',
  templateUrl: './menu-panel.component.html',
  styleUrls: ['./menu-panel.component.scss'],
})
export class MenuPanelComponent implements OnInit {
  
  isNavOpen: boolean = false;

  @Input()
  page:string= '';


  constructor(private changeDetectorRef: ChangeDetectorRef) {}

  ngOnInit(): void {}

  onTriggerNav() {
    this.isNavOpen = !this.isNavOpen;
    this.changeDetectorRef.detectChanges();
  }
}
