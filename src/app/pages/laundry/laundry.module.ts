import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MaterialModule } from "../../material.module";

// icons
import { TablerIconsModule } from "angular-tabler-icons";
import * as TablerIcons from "angular-tabler-icons/icons";

import { LaundryRoutes } from "./laundry.routing";
import { TransactionComponent } from "./transaction/transaction.component";
import { BarangComponent } from "./barang/barang.component";
import { BarangCreateComponent } from "./barang/barang-create/barang-create.component";
import { BarangDetailComponent } from "./barang/barang-detail/barang-detail.component";
import { CustomerComponent } from "./customer/customer.component";
import { CustomerCreateComponent } from "./customer/customer-create/customer-create.component";
import { TransactionDetailsComponent } from "./transaction/transaction-details/transaction-details.component";
import { TransactionCreateComponent } from "./transaction/transaction-create/transaction-create.component";
import { HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from "src/app/app-routing.module";
import { MenuComponent } from './menu/menu.component';
import { MenuCreateComponent } from './menu/menu-create/menu-create.component';
import { MenuDetailComponent } from './menu/menu-detail/menu-detail.component';
import { GroupMenuComponent } from './group-menu/group-menu.component';
import { GroupMenuCreateComponent } from './group-menu/group-menu-create/group-menu-create.component';
import { GroupMenuDetailComponent } from './group-menu/group-menu-detail/group-menu-detail.component';
import { TransactionProgressCreateComponent } from './transaction/transaction-progress-create/transaction-progress-create.component';
import { TransactionProgressUpdateComponent } from './transaction/transaction-progress-update/transaction-progress-update.component';

@NgModule({
	imports: [
		CommonModule,
		RouterModule.forChild(LaundryRoutes),
		MaterialModule,
		FormsModule,
		ReactiveFormsModule,
		TablerIconsModule.pick(TablerIcons),
		HttpClientModule,
	],
	declarations: [
		TransactionComponent,
		BarangComponent,
		BarangCreateComponent,
		BarangDetailComponent,
		CustomerComponent,
		CustomerCreateComponent,
		TransactionDetailsComponent,
		TransactionCreateComponent,
  MenuComponent,
  MenuCreateComponent,
  MenuDetailComponent,
  GroupMenuComponent,
  GroupMenuCreateComponent,
  GroupMenuDetailComponent,
  TransactionProgressCreateComponent,
  TransactionProgressUpdateComponent,
	],
})
export class LaundryModule {}
