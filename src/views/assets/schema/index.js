import * as yup from 'yup';

export const initialState = {
    showAddNewModal: false,
    showAddNewCategoryModal: false,
    addCategoryClicked: false,
    editRow: {},
    editClicked: false,
    showEditForm: false,
    deleteRow: {},
    showAlertConfirm: false,
    moreInfo: {}
};

export const validationSchema = yup.object({
    assetName: yup
        .string('Enter asset name')
        .min(2, 'Product name should be of minimum 8 characters length')
        .required('Asset name is required').nullable(),
    plateNumber: yup.string('Enter plate number').required('Plate number is required').nullable(),
    quantity: yup.string('Enter product quantity').required('Product quantity is required').nullable(),
    condition: yup.string('Choose condition').required('Condition is required').nullable(),
    category: yup.string('Choose product category').required('Product category is required').nullable(),
    // manufacturedDate: yup.date().required('Manufactured date is required'),
    make: yup.string('Enter model name').required('Model name is required').nullable(),
    description: yup.string('Enter product description').required('Product description is required').nullable(),
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
