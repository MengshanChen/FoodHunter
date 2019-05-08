"use strict";
exports.__esModule = true;
var ApplicationFormModel_1 = require("../model/ApplicationFormModel");
// Creates and configures an ExpressJS web server.
var ApplicationFormRoute = /** @class */ (function () {
    //Run configuration methods on the Express instance.
    function ApplicationFormRoute() {
        this.applicationForm = new ApplicationFormModel_1.ApplicationFormModel();
    }
    ApplicationFormRoute.prototype.registerRoutes = function (router) {
        this.routes(router);
    };
    // Configure API endpoints.
    ApplicationFormRoute.prototype.routes = function (router) {
        var _this = this;
        //get by id
        router.get('/applicationForm/:applicationFormID', function (req, res) {
            var applicationFormID = req.params.applicationFormID;
            console.log('try to get applicationFormID:', applicationFormID);
            _this.applicationForm.getApplicationFormByID(res, applicationFormID);
        });
        //get all
        router.get('/applicationForm', function (req, res) {
            var applicationFormID = req.params.applicationFormID;
            console.log('try to get all applicationForm');
            _this.applicationForm.getAllApplicationForm(res);
        });
        //delete
        router["delete"]('/applicationForm/:applicationFormID', function (req, res) {
            var applicationFormID = req.params.applicationFormID;
            console.log('try to delete applicationFormID:', applicationFormID);
            _this.applicationForm.deleteApplicationForm(res, applicationFormID);
        });
        //update
        router.put('/applicationForm/:applicationFormID', function (req, res) {
            var applicationFormID = req.params.applicationFormID;
            console.log('try to update applicationFormID:', applicationFormID);
            var newapplicationForm = req.body;
            _this.applicationForm.updateApplicationForm(res, applicationFormID, newapplicationForm);
        });
        //create
        router.post('/applicationForm', function (req, res) {
            var newapplicationForm = req.body;
            console.log('try to create:', newapplicationForm);
            _this.applicationForm.createApplicationForm(res, newapplicationForm);
        });
    };
    return ApplicationFormRoute;
}());
exports.ApplicationFormRoute = ApplicationFormRoute;
