'use strict';

/** @type {import('sequelize-cli').Migration} */

module.exports = {

  async up (queryInterface, Sequelize) {

    const positionNames = ['CTO','Senior software eng','Software eng','Junior software eng'];
    const positionData = [];

    for (let i = 0; i < positionNames.length; i++) {
      positionData.push({
        name: positionNames[i],
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }

    await queryInterface.bulkInsert('positions', positionData, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('positions', null, {});    
  }
};
