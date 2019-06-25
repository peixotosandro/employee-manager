const request = require("supertest");

const app = require("../../src/app");

describe("Employees - Register", () => {
  it("should register the first new employee.", async () => {
    const response = await request(app)
      .post("/employee")
      .send({
        name: "employee name 1",
        email: "test1@test.com",
        departament: "employee departament 1"
      });

    expect(response.status).toBe(200);
  });

  it("should register the second new employee.", async () => {
    const response = await request(app)
      .post("/employee")
      .send({
        name: "employee name 2",
        email: "test2@test.com",
        departament: "employee departament 2"
      });

    expect(response.status).toBe(200);
  });

  it("should not add an employee already exists.", async () => {
    const response = await request(app)
      .post("/employee")
      .send({
        name: "employee name 1",
        email: "test1@test.com",
        departament: "employee departament 1"
      });

    expect(response.status).toBe(400);
  });
});

describe("Employees - Find All/One", () => {
  it("should find all employee.", async () => {
    const response = await request(app).get("/employee");

    expect(response.body.length).toBe(2);
  });

  it("should find one employee registered.", async () => {
    const response = await request(app).get("/employee/1");

    expect(response.body.name).toBe("employee name 1");
  });

  it("should not find one employee through wrong id.", async () => {
    const response = await request(app).get("/employee/5");

    expect(response.status).toBe(400);
  });
});

describe("Employees - Update", () => {
  it("should update employee.", async () => {
    const response = await request(app)
      .put("/employee/1")
      .send({
        name: "employee name changed",
        email: "emailchanged@test.com",
        departament: "employee departament changed"
      });

    expect(response.status).toBe(200);
  });

  it("should not update employee with email from another employee.", async () => {
    const response = await request(app)
      .put("/employee/1")
      .send({
        name: "employee name changed",
        email: "test2@test.com",
        departament: "employee departament changed"
      });

    expect(response.status).toBe(400);
  });

  it("should not update employee through wrong id.", async () => {
    const response = await request(app)
      .put("/employee/5")
      .send({
        name: "employee name 5",
        email: "test5@test.com",
        departament: "employee departament 5"
      });

    expect(response.status).toBe(400);
  });
});

describe("Employees - Delete", () => {
  it("should delete employee.", async () => {
    const response = await request(app).delete("/employee/1");

    expect(response.status).toBe(200);
  });

  it("should not delete employee through wrong id.", async () => {
    const response = await request(app).delete("/employee/1");

    expect(response.status).toBe(400);
  });
});
