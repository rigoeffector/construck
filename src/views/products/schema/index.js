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
    name: yup
        .string('Enter product name')
        .min(2, 'Product name should be of minimum 8 characters length')
        .required('Product name is required'),
        unit_price: yup.string('Enter product price').required('Product price is required'),
    quantity: yup.string('Enter product quantity').required('Product quantity is required'),
    category: yup.string('Choose product category').required('Product category is required'),
    vendor: yup.string('Choose product vendor').required('Product vendor is required'),
    description: yup.string('Enter product description').required('Product description is required')
    // images: yup.string('Choose product images').required('Product images are required')
});

export const validationCategorySchema = yup.object({
    name: yup
        .string('Enter category name')
        .min(2, 'Product category name should be of minimum 8 characters length')
        .required('Product name is required'),
    description: yup.string('Enter product category description').required('Product category description is required')
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
