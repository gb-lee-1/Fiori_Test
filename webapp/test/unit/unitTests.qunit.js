/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"synccl3/test/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});
