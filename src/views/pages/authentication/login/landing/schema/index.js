import * as yup from 'yup';


export const validationSchema = yup.object({
    requestedBy: yup.string('Enter company name').required('Company name is required').nullable(),
    phoneNumber: yup.string('Enter phone number ').required('phone number  is required').nullable(),
    email: yup.string('Enter email').required('email is required').nullable(),
    tinNumber: yup.string('Enter TIN number').required('TIN number is required').nullable(),
    assetIds: yup.string('Choose Asset').required('Asset is required').nullable(),
   
    purpose: yup.string('Enter purpose').required('Purpose  is required').nullable(),
    from: yup.date().required('From Date  is required').nullable(),
    to: yup.date().required('To Date is required').nullable()
});


       
      
        
        
       
        
       
        

export const validationSchemaIndiv = yup.object({
    firstName: yup.string('Enter first name').required('First name is required').nullable(),
    lastName: yup.string('Enter last name').required('Last name is required').nullable(),
    phoneNumber: yup.string('Enter phone number ').required('phone number  is required').nullable(),
    email: yup.string('Enter email').required('email is required').nullable(),
    idNumber: yup.string('Enter ID number').required('ID number is required').nullable(),
    assetIds: yup.string('Choose Asset').required('Asset is required').nullable(),
    purpose: yup.string('Enter purpose').required('Purpose  is required').nullable(),
    from: yup.date().required('From Date  is required').nullable(),
    to: yup.date().required('To Date is required').nullable()
});
