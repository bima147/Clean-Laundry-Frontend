import { IBodySendMenu, IMenu, IMenuUser } from "./i-menu";

export interface IGroupMenu {
	groupName: string;
	menuModel: IMenuUser[];
}

export interface IGroupDetail extends IGroupMenu {
	groupMenuID: number;
}
