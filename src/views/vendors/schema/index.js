import * as yup from 'yup';

export const initialState = {
    showAddNewModal: false,
    editRow: {},
    deleteRow: {},
    showAlertConfirm: false,
    showEditForm: false,
    editClicked: false
};

export  const validationSchema = yup.object({
    name: yup.string('Enter vendor name').min(2, 'Vendor name be of minimum 8 characters length').required('Vendor name is required'),
    address: yup.string('Enter vendor address').required('Vendor address is required'),
    contact_phone: yup.string('Enter vendor phone number').required('Vendor phone number is required'),
    email: yup.string('Enter vendor email').required('Vendor email is required')
});