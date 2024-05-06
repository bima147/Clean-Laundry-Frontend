export interface IMenu {
	menuID: number;
	menuName: string | null;
	menuLink: string | null;
	menuIcon: string | null;
	menuNameService: string | null;
	doAction: string | null;
	show: boolean | null;
	createdBy: number | null;
	updatedBy: number | null;
	createdAt: number | null;
	updatedAt: number | null;
}

export interface ISendMenu {
	menuName: string | null;
	menuLink: string | null;
	menuIcon: string | null;
	menuNameService: string | null;
	doAction: string | null;
	show: boolean | null;
}

export interface IMenuUser {
	menuID: number;
	menuName: string | null;
	menuLink: string | null;
	menuIcon: string | null;
	menuService: string | null;
	doAction: string | null;
	show: boolean | null;
	createdBy: number | null;
	updatedBy: number | null;
	createdAt: number | null;
	updatedAt: number | null;
}

export interface IBodySendMenu {
	menuID: number;
}
