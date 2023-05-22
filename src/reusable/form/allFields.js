/* eslint-disable no-unused-vars */
import React from 'react';
import DaaDaSelectField from './select';
import DaaDaInputField from './input';
import DaaDaTextAreaField from './textarea';
export const DaaDaFields = ({row, key, ...rest}) => {
    debugger;
    const getFieldView = ({type, ...props}, index, ...rest) => {
        debugger;
        switch (type) {
            case 'select':
                return <DaaDaSelectField type={type} {...props} {...rest} key={'md-form-field' + index} />; // should know what to expect

            case 'textarea':
                return <DaaDaTextAreaField type={type} {...props} {...rest} key={'md-form-field' + index} />; // this knows what it's expecting

            default:
                return <DaaDaInputField type={type} {...props} {...rest} key={'md-form-field' + index} />;
        }
    };
    return (
        <>
            {(row || []).map((field, index) => {
                return getFieldView(field, index, ...rest);
            })}
        </>
    );
};
export default DaaDaFields;
