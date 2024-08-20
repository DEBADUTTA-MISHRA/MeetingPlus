const USER = require('../models/userModel');
const Employee = require('../models/employeeModel');
const commonHelper = require('../helpers/commonHelper');

const createEmployee = async (data) => {
    const emailExists = await USER.findOne({ email: data.email });
    if (emailExists) {
        return { isDuplicateEmail: true };
    }
    
    const hashedPassword = await commonHelper.hashPassword(data.password);
    const newEmployee = new USER({ ...data, password: hashedPassword });
    const result = await newEmployee.save();    
    return result;
};

/*FUNC TO ADD EMPLOYEE*/
const addEmployee = async (data) => {
  const emailExists = await Employee.findOne({ email: data.email });
  if (emailExists) {
      return { isDuplicateEmail: true };
  }

  const newEmployee = new Employee({ ...data });
  const result = await newEmployee.save();    
  return result;
};

/**FUNC- TO SEE LIST OF EMPLOYEE */
const listEmployee = async (bodyData, queryData) => {
    const { order } = queryData;
    const { searchKey } = bodyData;
    console.log("queryData:",queryData);
    console.log("searchKey:",searchKey);
    let query = searchKey
      ? {
          $and: [
            {
              $or: [
                { name: { $regex: searchKey, $options: "i" } },
                { email: { $regex: searchKey, $options: "i" } },
              ],
            },
            {
              isActive: true,
            },
          ],
        }
      : {
          isActive: true,
        };
        console.log("query:",query);
    const limit = queryData.limit ? parseInt(queryData.limit) : 0;
    const skip = queryData.page ? (parseInt(queryData.page) - 1) * limit : 0;
  
   
    const totalCount = await Employee.countDocuments(query);
    const employeeData = await Employee.find(query)
      .sort({ _id: parseInt(order) })
      .skip(skip)
      .limit(limit);
      console.log("EMp data--&**&", employeeData);
    return { totalCount, employeeData };
  };
  
  /**FUNC- TO SEE SINGLE EMPLOYE DETAILS */
  const viewSingleEmployee = async (id) => {
    const singleEmployeDetails = await USER.findById({
      _id: id,
      isActive: true,
    });
    console.log("single employee", singleEmployeDetails);
    return singleEmployeDetails;
  };
  
  /**FUNC- TO VERIFY ACTIVE USER*/
  const verifyEmployee = async (empId) => {
    console.log("empId-----------", empId);
    return await USER.findOne(
      { _id: new ObjectId(empId), isActive: true },
      {
        _id: 1,
        email: 1,
        name: 1,
        isActive: 1,
      }
    );
  };

module.exports = {
    createEmployee,
    listEmployee,
    verifyEmployee,
    viewSingleEmployee,
    addEmployee
};
