import React from "react";

type ISearchInputProps = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus: () => void;
};

export default function SearchInput({
  value,
  onChange,
  onFocus,
}: ISearchInputProps) {
  return (
    <div className="search__input__container">
      <input
        type="text"
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        placeholder="Type your favorite show"
      />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="search-icon"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
    </div>
  );
}
