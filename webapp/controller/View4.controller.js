sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, MessageToast) {
        "use strict";

        return Controller.extend("sync.cl3.test.controller.View4", {
            onInit: function () {
                var oRouter = this.getOwnerComponent().getRouter();
                oRouter.getRoute("RouteView4").attachPatternMatched(this._onRouteMatched, this);
            },

            _onRouteMatched : function () {
                var oAppModel = this.getView().getModel("appModel");
                oAppModel.setProperty("/page", 4);
            },

            onPost : function() {
                // OData post 요청 처리
                // FeedInput 입력칸에 넣은 댓글내용을 가지고 생성요청 (내용 받아오는 방법은 화면객체 or 이벤트객체 or 프로퍼티바인딩 자유롭게 구현)
                var oFeedInput = this.byId("feedInput"),
                    sValue = oFeedInput.getValue();
                var oModel = this.getView().getModel();

                oModel.createEntry("/CommentSet", { properties : { "Comments" : sValue } });
                oModel.submitChanges();
            },

            onDelete : function (oEvent) {
                var oItem = oEvent.getParameter("listItem");
                var sPath = oItem.getBindingContextPath();

                var oModel = this.getView().getModel();

                oModel.remove(sPath, {
                    success : function() {
                        MessageToast.show("삭제완료")
                    }
                });
            }
        });
    });
