import { Component } from "@angular/core";

@Component({
	selector: "app-branding",
	styleUrls: ["./branding.component.scss"],
	template: `
		<div class="branding text-center">
			<h1>
				<a href="/">Clean <span>Laundry</span></a>
			</h1>
		</div>
	`,
})
export class BrandingComponent {
	constructor() {}
}
