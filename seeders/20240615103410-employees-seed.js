'use strict';
const { faker } = require('@faker-js/faker');

/** @type {import('sequelize-cli').Migration} */

// Function to generate random number
const randomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
}

module.exports = {
  async up (queryInterface, Sequelize) {

    const employeeData = [];

    //Insert the CTO first
    employeeData.push({
      name: faker.person.fullName(),
      positionId: 1,
      managerId: 0,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    //Insert some Senior Software Engineers under the CTO
    for (let i = 0; i < 1000; i++) {
      employeeData.push({
        name: faker.person.fullName(),
        positionId: 2,
        managerId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }

    //Insert some Software Engineers under the Senior Software Engineers
    for (let i = 0; i < 4000; i++) {
      employeeData.push({
        name: faker.person.fullName(),
        positionId: 3,
        managerId: randomNumber(2, 1001),
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }

    //Insert some Junior Software Engineers under the Software Engineers
    for (let i = 0; i < 500; i++) {
      employeeData.push({
        name: faker.person.fullName(),
        positionId: 4,
        managerId: randomNumber(1002, 4001),
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }

    await queryInterface.bulkInsert('employees', employeeData, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('employees', null, {});
  }
};
