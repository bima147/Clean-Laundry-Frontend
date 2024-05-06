import {
	IBodySendMenu,
	IMenu,
	IMenuUser,
	ISendMenu,
} from "../interfaces/i-menu";

export class Menu implements IMenu {
	menuID: number = 0;
	menuName: string | null = "";
	menuLink: string | null = "";
	menuIcon: string | null = "";
	menuNameService: string | null = "";
	doAction: string | null = "";
	show: boolean | null = false;
	createdBy: number | null = 0;
	updatedBy: number | null = 0;
	createdAt: number | null = 0;
	updatedAt: number | null = 0;
}

export class SendMenu implements ISendMenu {
	menuName: string | null = "";
	menuLink: string | null = "";
	menuIcon: string | null = "";
	menuNameService: string | null = "";
	doAction: string | null = "";
	show: boolean | null = false;
}

export class MenuUser implements IMenuUser {
	menuID: number = 0;
	menuName: string | null = "";
	menuLink: string | null = "";
	menuIcon: string | null = "";
	menuService: string | null = "";
	doAction: string | null = "";
	show: boolean | null = false;
	createdBy: number | null = 0;
	updatedBy: number | null = 0;
	createdAt: number | null = 0;
	updatedAt: number | null = 0;
}

export class BodySendMenu implements IBodySendMenu {
	menuID: number = 0;
}
