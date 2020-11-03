"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var employees_service_1 = require("./employees.service");
describe('EmployeesService', function () {
    beforeEach(function () { return testing_1.TestBed.configureTestingModule({}); });
    it('should be created', function () {
        var service = testing_1.TestBed.get(employees_service_1.EmployeesService);
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=employees.service.spec.js.map