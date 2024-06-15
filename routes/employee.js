// routes/employee.js
const express = require('express');
const router = express.Router();
const { Employee, Position } = require('../models');

router.get('/:id', async (req, res) => {
  const { id } = req.params;

  const getEmployeeHierarchy = async (id) => {
    const employee = await Employee.findOne({
      where: { id },
      include: [
        {
          model: Position,
          attributes: ['name']
        },
        {
          model: Employee,
          as: 'subordinates',
          include: [
            {
              model: Position,
              attributes: ['name']
            }
          ]
        }
      ]
    });

    if (!employee) {
      return null;
    }

    const hierarchy = {
      id: employee.id,
      name: employee.name,
      positionId: employee.positionId,
      positionName: employee.Position.name,
      child: employee.subordinates.length
        ? await Promise.all(employee.subordinates.map(sub => getEmployeeHierarchy(sub.id)))
        : null
    };

    return hierarchy;
  };

  const hierarchy = await getEmployeeHierarchy(id);
  if (!hierarchy) {
    return res.status(404).json({ error: 'Employee not found' });
  }

  res.json(hierarchy);
});

module.exports = router;