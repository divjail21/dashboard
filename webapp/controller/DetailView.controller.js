sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller) {
	"use strict";

	return Controller.extend("dj.Dashboard.controller.DetailView", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf dj.Dashboard.view.DetailView
		 */
		onInit: function () {
			
			var oRouter = new sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.getRoute("Route_detailView").attachPatternMatched(this._onObjectMatched, this);

		},
		_onObjectMatched: function (oEvent) {
			var sObjectId = oEvent.getParameter("arguments").salesOrdr;
			if (!sObjectId) {
				return;
			}
			this.getModel().metadataLoaded().then(function () {
				var sObjectPath = this.getModel().createKey("SalesOrderSet", {
					SalesOrderID: sObjectId
				});
				this._bindView("/" + sObjectPath);
			}.bind(this));
		},
		_bindView: function (sObjectPath) {
			this.getView().bindElement({
					path: sObjectPath
				});
			}

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf dj.Dashboard.view.DetailView
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf dj.Dashboard.view.DetailView
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf dj.Dashboard.view.DetailView
		 */
		//	onExit: function() {
		//
		//	}

	});

});