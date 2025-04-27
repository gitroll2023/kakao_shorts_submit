import React from 'react';

interface SubmitButtonProps {
  onClick: () => void;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="btn-premium w-full sm:w-auto flex items-center justify-center mx-auto"
    >
      <span className="mr-2">📝</span>
      사연 제보하기
    </button>
  );
};

export default SubmitButton;
