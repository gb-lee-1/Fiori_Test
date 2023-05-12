sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, Filter, FilterOperator) {
        "use strict";

        return Controller.extend("sync.cl3.test.controller.View2", {
            onInit: function () {
                var oRouter = this.getOwnerComponent().getRouter();
                oRouter.getRoute("RouteView2").attachPatternMatched(this._onRouteMatched, this);
            },

            _onRouteMatched : function () {
                var oAppModel = this.getView().getModel("appModel");
                oAppModel.setProperty("/page", 2);
            },

            onSearch : function (oEvent) {
                var sQuery = oEvent.getParameter("query");
                var oTable = this.byId("table"),
                    oBinding = oTable.getBinding("items");
                var aFilters = [];

                // 검색어가 있을때, 없을때 따라서 검색조건 필터 적용
                // 검색어가 있을때만 필터객체를 만들어서 적용!
                if(sQuery) { // "" <- false
                    var oFilter = new Filter(
                        {
                            path : "name",
                            operator : FilterOperator.Contains,
                            value1 : sQuery
                        }
                    );

                    aFilters.push(oFilter);
                }

                oBinding.filter(aFilters);

            }
        });
    });
