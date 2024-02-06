'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
      
    await queryInterface.addColumn("Users", "course_id", {
      type: Sequelize.DataTypes.INTEGER,
    });

    await queryInterface.addConstraint("Users", {
      fields: ["course_id"],
      type: "foreign key",
      references: {
        table: "Courses",
        field: "id",
      },
    });
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn("Educators", "course_id");
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};