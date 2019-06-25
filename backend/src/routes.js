const routes = require("express").Router();
const employeeController = require("./app/controllers/EmployeeController");

routes.get("/employee", employeeController.index);
routes.post("/employee", employeeController.store);
routes.get("/employee/:id", employeeController.show);
routes.put("/employee/:id", employeeController.update);
routes.delete("/employee/:id", employeeController.destroy);

module.exports = routes;
