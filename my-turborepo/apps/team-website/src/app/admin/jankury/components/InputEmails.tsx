import React from 'react';
import { useFormContext } from 'react-hook-form';

const InputEmails: React.FC = () => {
  const { register } = useFormContext();

  return (
    <div className='flex flex-col py-2'>
      <label htmlFor="additionalEmails" className='text-base font-semibold text-white'>
        Additional Recipient Emails
      </label>
      <textarea
        id="additionalEmails"
        rows={5}
        cols={30}
        placeholder="Enter emails separated by commas"
        className='rounded-md border border-gray-400 bg-gray-100 p-2 text-black'
        {...register('additionalEmails')}
      />
    </div>
  );
};

export default InputEmails;