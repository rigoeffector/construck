import React, { useState } from 'react';
import { Formik } from 'formik';
import { Form } from 'react-bootstrap';
import DaaDaFields from './allFields';
import { DaaDaSelectField } from './select';

export const MDForm = ({ children, schema, validation, onSubmit, state }) => {
  const [validateOnChange, setValidateOnChange] = useState(false);
  return (
    <div>
      <Formik
        initialValues={state}
        validationSchema={validation}
        validateOnChange={validateOnChange}
        validateOnBlur={false}
        onSubmit={(values) => {
          onSubmit && onSubmit(values);
        }}
        enableReinitialize
      >
        {({ handleSubmit, handleReset, ...rest }) => {
          return (
            <>
              <Form
                onSubmit={(event) => {
                  setValidateOnChange(true);
                  handleSubmit(event);
                }}
                onReset={handleReset}
              >
                {(schema || []).map((row, index) => {
                  if ((row || []).length > 1) {
                    <Form.Row key={'md-form-row' + index + 10}>
                      <DaaDaSelectField type={row.type} {...rest} key={'md-form-field' + index} />
                      {/* <DaaDaFields row={row} {...rest} /> */}
                    </Form.Row>;
                  }
                  return (
                    <Form.Row key={'md-form-row' + index + 1}>
                      <DaaDaFields row={row} {...rest} />
                    </Form.Row>
                  );
                })}
                {children}
              </Form>
            </>
          );
        }}
      </Formik>
    </div>
  );
};

export default MDForm;
