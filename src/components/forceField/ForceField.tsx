import React, { forwardRef  } from 'react';
import './forceField.sass';

interface ForceFieldProps {};

const ForceField = forwardRef<HTMLDivElement, ForceFieldProps>((_props, ref) => {
  return (
    <div ref={ref} className="forceField">
      {/* This div will visually represent the force field */}
    </div>
  );
});

export default ForceField;
