import React from 'react';
import { useFormContext } from 'react-hook-form';

const InputEmails: React.FC = () => {
  const { register } = useFormContext();

  return (
    <div className='flex flex-col py-4'>
      <label htmlFor="additionalEmails">Additional Emails (email1@gmail.com,email2@gmail.com...):</label>
      <textarea
        id="additionalEmails"
        rows={5}
        cols={30}
        placeholder="Enter emails separated by commas"
        className='p-2'
        {...register('additionalEmails')}
      />
    </div>
  );
};

export default InputEmails;