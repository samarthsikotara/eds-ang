var db = require("../models/index");
//var config = require('../config/index')

const Student = db.sequelize.define("students", {
  id: {
    type: db.Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  uuid: {
    type: db.Sequelize.UUID,
    unique: true,
    defaultValue: db.Sequelize.UUIDV4  
  },
  name: {
    type: db.Sequelize.STRING,
    allowNull: false
  },
  birthdate: {
    type: db.Sequelize.DATE,
    allowNull: false
  }
});

const Test = db.sequelize.define("tests", {
  id: {
    type: db.Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  uuid: {
    type: db.Sequelize.UUID,
    unique: true,
    defaultValue: db.Sequelize.UUIDV4  
  },
  studentId: {
    type: db.Sequelize.INTEGER,
    allowNull: false
  },
  score: {
    type: db.Sequelize.STRING,
    allowNull: false
  }
});

const User = db.sequelize.define("users", {
  id: {
    type: db.Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  uuid: {
    type: db.Sequelize.UUID,
    unique: true,
    defaultValue: db.Sequelize.UUIDV4  
  },
  username: {
    type: db.Sequelize.TEXT,
    allowNull: false
  },
  phoneNumber: {
    type: db.Sequelize.TEXT,
    allowNull: false
  },
  tempPassword: {
    type: db.Sequelize.VIRTUAL
  },
  password: {
    type: db.Sequelize.TEXT
  }
});

module.exports = {
  Student: Student,
  Test: Test,
  User: User
}
