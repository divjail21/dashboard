sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/Filter",
	"sap/m/MessageToast"
], function (Controller, Filter, MessageToast) {
	"use strict";

	return Controller.extend("dj.Dashboard.controller.View1", {
		onInit: function () {

			this.si = 1;

		},
		onSearch: function (oEvent) {
			var oView = this.getView();
			// Get the value entered in the Input field
			var fromDate = oView.byId("fromdate").getDateValue();
			var toDate = oView.byId("todate").getDateValue();
			var SalesOrderid = oView.byId("salesOrderid").getValue();
			var customerName = oView.byId("customerName").getValue();
			var deliveryStatus = oView.byId("deliveryStatus").getValue();
			var newFilter;
			var newdate = new Date(toDate);
			var myDate = newdate;
			myDate.setDate(myDate.getDate() + 1);
			
			if (fromDate === null || toDate === null || fromDate === "" || toDate === "") {
				if (fromDate === null || fromDate === "" ) {
					this.getView().byId("fromdate").setValueState("Error");
				}
				else
					this.getView().byId("fromdate").setValueState("None");
					
				if (toDate === null || toDate === "") {
					this.getView().byId("todate").setValueState("Error");
				}
				else
					this.getView().byId("todate").setValueState("None");
				/*MessageToast.show("From Date and To Date are mandtory fields", {
					closeOnBrowserNavigation: false
				});*/
			} else {
				this.getView().byId("fromdate").setValueState("None");
				this.getView().byId("todate").setValueState("None");
				var oTable = this.getView().byId('salesorderid');
				oTable.setVisible(true);

				var aFilters = [];

				if (fromDate !== null && toDate !== null && fromDate !== "" && toDate !== "") {
					newFilter = new Filter(
						"CreatedAt",
						sap.ui.model.FilterOperator.BT,
						fromDate,
						myDate
					);
					aFilters.push(newFilter);
					this.si = 2;
				}
				if (SalesOrderid !== null && SalesOrderid !== "") {
					aFilters.push(new Filter("SalesOrderID", sap.ui.model.FilterOperator.EQ, SalesOrderid));
					this.si = 2;
				}
				if (customerName !== null && customerName !== "") {
					aFilters.push(new Filter("CustomerName", sap.ui.model.FilterOperator.EQ, customerName));
					this.si = 2;
				}
				if (deliveryStatus !== null && deliveryStatus !== "") {
					aFilters.push(new Filter("DeliveryStatus", sap.ui.model.FilterOperator.EQ, deliveryStatus));
					this.si = 2;
				}
				if (this.si !== 1) {
					var binding = oTable.getBinding("items");
					binding.filter(aFilters);
				}
			}
		},
		goToDetailView: function (oEvent) {
				//This code was generated by the layout editor.
				//MessageToast.show("Navigating to Details of" + oEvent.getSource().getBindingContext("BusnsPrtnrModel"));
				var salesOrdrid = oEvent.getSource().getBindingContext().getProperty("SalesOrderID");
				var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
				oRouter.navTo("Route_detailView", {
						salesOrdr : salesOrdrid
				});
			}
	});
});