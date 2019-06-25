const Op = require("sequelize").Op;
const { Employee } = require("../models");

module.exports = {
  async index(req, res) {
    try {
      const employees = await Employee.findAll({
        attributes: ["id", "name", "email", "departament"],
        order: ["name"]
      });

      return res.json(employees);
    } catch (error) {
      return res.status(400).send({ error: "While getting employee list." });
    }
  },

  async store(req, res) {
    const { email } = req.body;

    try {
      if (await Employee.findOne({ where: { email: email } })) {
        return res.status(400).send({ error: "Employee already exists." });
      }

      const { id, name, departament } = await Employee.create(req.body);

      const employee = {
        id: id,
        name: name,
        email: email,
        departament: departament
      };

      req.io.emit("employeeRegistered", employee);

      return res.json(employee);
    } catch (error) {
      return res.status(400).send({ error: "While adding employee." });
    }
  },

  async show(req, res) {
    const _id = req.params.id;

    try {
      const { id, name, email, departament } = await Employee.findOne({
        where: { id: _id }
      });

      const employee = {
        id: id,
        name: name,
        email: email,
        departament: departament
      };

      return res.json(employee);
    } catch (error) {
      return res.status(400).send({ error: "While getting employee." });
    }
  },

  async update(req, res) {
    const _id = req.params.id;
    const { email } = req.body;

    try {
      if (
        await Employee.findOne({
          where: { email: email, id: { [Op.ne]: _id } }
        })
      ) {
        return res
          .status(400)
          .send({ error: "E-mail already exists for another employee." });
      }

      const result = await Employee.update(req.body, { where: { id: _id } });

      if (result[0] === 1) {
        req.io.emit("employeeUpdated", Number(_id));

        return res.send({ message: "Employee updated successfully." });
      } else {
        return res.status(400).send({ error: "Employee not exists." });
      }
    } catch (error) {
      return res.status(400).send({ error: "While updating employee." });
    }
  },

  async destroy(req, res) {
    const _id = req.params.id;

    try {
      const result = await Employee.destroy({ where: { id: _id } });

      if (result === 1) {
        req.io.emit("employeeDeleted", Number(_id));

        return res.send({ message: "Employee deleted successfully." });
      } else {
        return res.status(400).send({ error: "Employee not exists." });
      }
    } catch (error) {
      return res.status(400).send({ error: "While deleting employee." });
    }
  }
};
