import React from 'react';

interface DaySelectBtnProps {
  text?: string;
  date: string;
  isSelected: boolean;
  onClick: (attr?: any) => any;
}

const DaySelectBtn = ({
  text,
  date,
  isSelected,
  onClick,
}: DaySelectBtnProps) => {
  return (
    <button
      onClick={onClick}
      className={`daySelectedBtn__button h-fit w-fit text-[1.2rem] 
      py-1 px-2 md:px-3 rounded-[8px] hover:bg-[var(--sky-color)] 
      hover:text-white duration-300 transition-all m-2
      ${
        isSelected
          ? 'bg-[var(--sky-color)] text-white hover:opacity-100'
          : 'hover:opacity-70'
      }
      `}
    >
      <div className={`flex flex-col dayselected__content`}>
        <span className={`daySelectBtn__date font-bold whitespace-normal`}>
          {date}
        </span>
      </div>
    </button>
  );
};

export default DaySelectBtn;
