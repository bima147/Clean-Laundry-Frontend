import { Routes } from "@angular/router";
import { TransactionComponent } from "./transaction/transaction.component";
import { BarangComponent } from "./barang/barang.component";
import { BarangCreateComponent } from "./barang/barang-create/barang-create.component";
import { BarangDetailComponent } from "./barang/barang-detail/barang-detail.component";
import { CustomerComponent } from "./customer/customer.component";
import { CustomerCreateComponent } from "./customer/customer-create/customer-create.component";
import { TransactionDetailsComponent } from "./transaction/transaction-details/transaction-details.component";
import { TransactionCreateComponent } from "./transaction/transaction-create/transaction-create.component";
import { MenuComponent } from "./menu/menu.component";
import { MenuDetailComponent } from "./menu/menu-detail/menu-detail.component";
import { MenuCreateComponent } from "./menu/menu-create/menu-create.component";
import { GroupMenuComponent } from "./group-menu/group-menu.component";
import { GroupMenuDetailComponent } from "./group-menu/group-menu-detail/group-menu-detail.component";
import { GroupMenuCreateComponent } from "./group-menu/group-menu-create/group-menu-create.component";
import { TransactionProgressCreateComponent } from "./transaction/transaction-progress-create/transaction-progress-create.component";
import { TransactionProgressUpdateComponent } from "./transaction/transaction-progress-update/transaction-progress-update.component";

// pages

export const LaundryRoutes: Routes = [
	{
		path: "",
		children: [
			{
				path: "transaction",
				component: TransactionComponent,
			},
			{
				path: "transaction/detail/:uuid",
				component: TransactionDetailsComponent,
			},
			{
				path: "transaction/new",
				component: TransactionCreateComponent,
			},
			{
				path: "transaction/:uuid/progress/new",
				component: TransactionProgressCreateComponent,
			},
			{
				path: "transaction/:uuid/progress/detail/:id",
				component: TransactionProgressUpdateComponent,
			},
			{
				path: "menu",
				component: MenuComponent,
			},
			{
				path: "menu/detail/:id",
				component: MenuDetailComponent,
			},
			{
				path: "menu/new",
				component: MenuCreateComponent,
			},
			{
				path: "group-menu",
				component: GroupMenuComponent,
			},
			{
				path: "group-menu/detail/:id",
				component: GroupMenuDetailComponent,
			},
			{
				path: "group-menu/new",
				component: GroupMenuCreateComponent,
			},
			{
				path: "barang",
				component: BarangComponent,
			},
			{
				path: "barang/new",
				component: BarangCreateComponent,
			},
			{
				path: "barang/detail/:id",
				component: BarangDetailComponent,
			},
			{
				path: "customer",
				component: CustomerComponent,
			},
			{
				path: "customer/new",
				component: CustomerCreateComponent,
			},
		],
	},
];
