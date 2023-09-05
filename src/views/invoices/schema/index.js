import * as yup from 'yup';

export const initialState = {
    showAddNewModal: false,
    showAddNewCategoryModal: false,
    addCategoryClicked: false,
    editRow: {},
    editClicked: false,
    showEditForm: false,
    deleteRow: {},
    showAlertConfirm: false
};
export const validationSchema = yup.object({
    amount: yup.string('Enter amount').required('Amount is required').nullable(),
    taxAmount: yup.string('Enter tax amount').required('Tax Amount is required').nullable(),
    description: yup.string('Enter description').required('Description is required').nullable(),
    dueDate: yup.date().required('Due date is required')
});

export const thumbsContainer = {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 16
};

export const thumb = {
    display: 'inline-flex',
    borderRadius: 2,
    border: '1px solid #eaeaea',
    marginBottom: 8,
    marginRight: 8,
    width: 100,
    height: 100,
    padding: 4,
    boxSizing: 'border-box'
};

export const thumbInner = {
    display: 'flex',
    minWidth: 0,
    overflow: 'hidden'
};

export const img = {
    display: 'block',
    width: 'auto',
    height: '100%'
};
