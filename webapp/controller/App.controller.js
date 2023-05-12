sap.ui.define(
    [
        "sap/ui/core/mvc/Controller"
    ],
    function(BaseController) {
      "use strict";
  
      return BaseController.extend("sync.cl3.test.controller.App", {
        onInit() {
        },

        onPress : function (iNum) {
          this.getOwnerComponent().getRouter().navTo("RouteView" + iNum);
        }
      });
    }
  );
  