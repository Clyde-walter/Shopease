
import React, { useState } from 'react';
import { CustomerCareFloatingButton } from './customer-care/CustomerCareFloatingButton';
import { CustomerCareModal } from './customer-care/CustomerCareModal';

export function CustomerCareButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <CustomerCareFloatingButton onClick={() => setIsOpen(true)} />
      <CustomerCareModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
