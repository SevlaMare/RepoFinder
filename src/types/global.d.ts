import React from 'react';

declare global {
  type FormSubmitEvent = React.FormEvent<HTMLFormElement>;
}
