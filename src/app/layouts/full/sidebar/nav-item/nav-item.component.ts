import { Component, Input, OnChanges } from "@angular/core";
import { NavItem } from "./nav-item";
import { Router } from "@angular/router";
import { NavService } from "../../../../services/nav.service";
import { IMenu } from "src/app/interfaces/i-menu";

@Component({
	selector: "app-nav-item",
	templateUrl: "./nav-item.component.html",
	styleUrls: [],
})
export class AppNavItemComponent implements OnChanges {
	@Input() item: IMenu[] | any;
	@Input() depth: any;

	constructor(public navService: NavService, public router: Router) {
		if (this.depth === undefined) {
			this.depth = 0;
		}
	}

	ngOnChanges() {
		this.navService.currentUrl.subscribe((url: string) => {
			if (this.item.route && url) {
			}
		});
	}

	onItemSelected(item: IMenu) {
		// if (!item.children || !item.children.length) {
		console.log(item.menuLink);
		this.router.navigate([item.menuLink]);
		// }

		// scroll
		document.querySelector(".page-wrapper")?.scroll({
			top: 0,
			left: 0,
		});
	}
}
