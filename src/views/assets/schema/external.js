import * as yup from 'yup';

export const validationSchema = yup.object({
    customerName: yup
        .string('Enter Customer name')

        .required('Customer name is required')
        .nullable(),
    assetName: yup
        .string('Enter asset name')
        .min(2, 'Asset name should be of minimum 8 characters length')
        .required('Asset name is required')
        .nullable(),
    plateNumber: yup.string('Enter plate number').required('Plate number is required').nullable(),
    customerId: yup.string('Enter customer ID').required('Customer ID is required').nullable(),
    condition: yup.string('Choose condition').required('Condition is required').nullable(),
    category: yup.string('Choose asset category').required('Assets category is required').nullable(),
    manufacturedDate: yup.date().required('Manufactured date is required'),
    make: yup.string('Enter model name').required('Model name is required').nullable(),
    description: yup.string('Enter Asset description').required('Asset description is required').nullable(),
    duration: yup.string('Enter duration ').required('Duration is required').nullable()
});
