const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');
const validator = require('../validator/employeeValidator');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/createEmployee',
     validator.createEmployeeValidator,
    //  authMiddleware.verifyToken,
     employeeController.createEmployee
    );

    //Add Employee
    router.post('/addEmployee',
      validator.addEmployeeValidator,
      employeeController.addEmployee
    )

   // Apply the verifyToken middleware to the protected route
router.get('/protected-route', authMiddleware.verifyToken, (req, res) => {
    // If the token is valid, this part will be executed
    res.json({ message: 'Access granted', user: req.user });
});

/* VIEW EMPLOYEE  */
router.post(
    "/listEmployee",
    validator.listEmployesValidator,
    authMiddleware.verifyToken,
    employeeController.listEmployee
  );
  /* VIEW SINGLE EMPLOYEE  */
  router.get(
    "/viewSingleEmployee/:id",
    validator.viewSingleEmployeeValidator,
    authMiddleware.verifyToken,
    employeeController.viewSingleEmployee
  );
  


module.exports = router;
