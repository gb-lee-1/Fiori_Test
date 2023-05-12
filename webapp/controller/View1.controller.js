sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel) {
        "use strict";

        return Controller.extend("sync.cl3.test.controller.View1", {
            onInit: function () {
                var oRouter = this.getOwnerComponent().getRouter();
                oRouter.getRoute("RouteView1").attachPatternMatched(this._onRouteMatched, this);

                var oData = {
                    field1 : null,
                    field2 : null,
                    operator : null,
                    result : null,
                    opList : [
                        { operator : "+", value : "더하기"},
                        { operator : "-", value : "빼기"},
                        { operator : "*", value : "곱하기"},
                        { operator : "/", value : "나누기"}
                    ]
                };
                var oModel = new JSONModel(oData);
                this.oModel = oModel;
                this.getView().setModel(oModel, "calc");
            },

            _onRouteMatched : function () {
                var oAppModel = this.getView().getModel("appModel");
                oAppModel.setProperty("/page", 1);
            },

            onCalc : function () {
                var oModel = this.oModel; // this.getView().getModel("calc");
                var iNum1 = oModel.getProperty("/field1");
                var iNum2 = parseInt(oModel.getProperty("/field2"));
                var sOp = oModel.getProperty("/operator");
                var iResult;

                switch (sOp) {
                    case "+":
                        iResult = iNum1 + iNum2
                        break;
                    case "-":
                        iResult = iNum1 - iNum2
                        break;
                    case "*":
                        iResult = iNum1 * iNum2
                        break;
                    case "/":
                        iResult = iNum1 / iNum2
                        break;
                
                    default:
                        break;
                }

                oModel.setProperty("/result" ,iResult);
            },

            onLiveChange : function (oEvent) {
                var oModel = this.oModel;
                var iNum1 = oModel.getProperty("/field1");
                var iNum2 = parseInt(oModel.getProperty("/field2"));
                var sOp = oModel.getProperty("/operator");
                var oBtn = this.byId("button1");

                if(iNum1 && iNum2 && sOp) {
                    // 계산 -> 1) 버튼을 누르는 동작 실행
                    oBtn.firePress();
                    // 2) 버튼 이벤트 메소드 실행
                    //this.onCalc();
                }
                
            }
        });
    });
