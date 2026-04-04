import React from 'react';
import { useFormContext } from 'react-hook-form';

const InputEmails: React.FC = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const additionalEmailsError = errors.additionalEmails;

  return (
    <div className='flex flex-col py-2'>
      <label htmlFor="additionalEmails" className='text-base font-semibold text-white'>
        Additional Recipient Emails
      </label>
      <textarea
        id="additionalEmails"
        rows={5}
        cols={30}
        placeholder="Enter emails separated by commas: ex. email1@gmail.com, email2@gmail.com..."
        className='rounded-md border border-gray-400 bg-gray-100 p-2 text-black'
        {...register('additionalEmails')}
      />
      {additionalEmailsError?.message ? (
        <p className='mt-1 text-xs text-red-400'>*{String(additionalEmailsError.message)}</p>
      ) : null}
    </div>
  );
};

export default InputEmails;