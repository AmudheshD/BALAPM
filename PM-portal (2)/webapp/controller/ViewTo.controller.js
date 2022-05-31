/*eslint-disable no-console, no-alert */
sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History"
], function(Controller, MessageBox, History) {
	"use strict";

	return Controller.extend("test.routing-sample.controller.ViewTo", {

		//Attarch event
		onInit: function() {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.getRoute("TargetViewToParameter").attachPatternMatched(this._onRouteMatched, this);
		},
		_onRouteMatched: function(oEvent) {

			alert(oEvent.getParameter("arguments").parameter.split(';'));

		},
		onNavBack: function(oEvent) {
			var oHistory = History.getInstance();
			var sPreviousHash = oHistory.getPreviousHash();

			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			} else {
				var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
				oRouter.navTo("TargetViewFrom", true);
			}
		},
		onRes: function() {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("TargetViewRes", {});
		},
		onResWithParameter: function(oEvent) {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("TargetViewToRes", {
				parameter: "test"
			});
		},
		onPress: function() {
			var id = this.getView().byId("user");
			var pwd = this.getView().byId("pass");
			var x = "/sap/opu/odata/sap/ZBK_MP_ODATA_SRV/";

			var mod = new sap.ui.model.odata.ODataModel(x, true);
			var url = "WfPasswrd='" + pwd.getValue() + "',Id='" + id.getValue() + "'";
			mod.read("/zod_mp_login1Set(" + url + ")", {
				success: function(oData, oResponse) {
					if (oData.Return === "ok") {
						// this.showBusyIndicator(800, 0);
						// MessageBox.success("Login successfully!");
						var obj = sap.ui.core.UIComponent.getRouterFor(this);
						obj.navTo("TargetViewRes");

					} else {
						// MessageBox.error("Please enter valid userid and password!");
					}
				}.bind(this)
			});

		}

	});

});