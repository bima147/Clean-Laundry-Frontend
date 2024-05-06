import { IGroupDetail, IGroupMenu } from "../interfaces/i-group-menu";
import { IBodySendMenu, IMenu, IMenuUser } from "../interfaces/i-menu";

export class GroupMenu implements IGroupMenu {
	groupName: string = "";
	menuModel: IMenuUser[] = [];
}

export class GroupMenuDetail implements IGroupDetail {
	groupMenuID: number = 0;
	groupName: string = "";
	menuModel: IMenuUser[] = [];
}
