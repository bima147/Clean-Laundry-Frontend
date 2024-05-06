import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { UserService } from "src/app/services/user.service";

@Component({
	selector: "app-track",
	templateUrl: "./track.component.html",
	styleUrls: ["./track.component.scss"],
})
export class TrackComponent {
	uuid: string = "";

	constructor(private router: Router) {}

	onTrack() {
		console.log(this.uuid);
		this.router.navigate(["/track/" + this.uuid]);
	}
}
