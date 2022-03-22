import PropTypes from 'prop-types';
// form
import { FormProvider as Form } from 'react-hook-form';

// ----------------------------------------------------------------------

FormProvider2.propTypes = {
  children: PropTypes.node.isRequired,
  methods: PropTypes.object.isRequired,
  onSubmit: PropTypes.func,
};

export default function FormProvider2({ children, onSubmit, methods }) {
  return (
    <Form {...methods}>
      <form encType='multipart/form-data' onSubmit={onSubmit}>{children}</form>
    </Form>
  );
}
