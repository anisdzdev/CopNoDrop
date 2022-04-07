import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {
  text: string = "";
  results = []

  constructor(private sharedService: SharedService, private router: Router, private changeDetector: ChangeDetectorRef, private ActivatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
  }

  search(e){
    this.sharedService.searchProduct(e.query).subscribe((res:any[])=>{
      this.results = res;
    })
  }
  route(item){
    this.router.navigateByUrl('/shop/description/'+item._id);

    this.changeDetector.detectChanges();
  }
}
