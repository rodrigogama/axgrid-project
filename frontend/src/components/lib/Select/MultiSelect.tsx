import { Fragment } from 'react';
import { Popover, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { Checkbox } from '../Checkbox';
import { MultiSelectProps, SelectOption } from './types';
import clsx from 'clsx';
import { Spinner } from '../Spinner';

export const MultiSelect = ({
  title,
  options,
  selectedOptions,
  disabled,
  isLoading,
  className,
  onSelect,
}: MultiSelectProps) => {
  const handleSelect = (selectedOption: SelectOption, checked: boolean) => {
    const updatedSelectedOptions = checked
      ? [...selectedOptions, selectedOption]
      : selectedOptions.filter((option) => option.value !== selectedOption.value);
    onSelect(updatedSelectedOptions);
  };

  return (
    <Popover className={clsx('relative inline-block text-left', className)}>
      <Popover.Button
        disabled={disabled}
        className={clsx(
          'group inline-flex min-w-28 w-full justify-between gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50',
          {
            'cursor-not-allowed !bg-gray-50': disabled,
          },
        )}
      >
        <span
          className={clsx({
            'text-gray-500': disabled,
          })}
        >
          {title}
        </span>

        {selectedOptions.length > 0 && (
          <span className='ml-1.5 rounded bg-gray-200 px-1.5 py-0.5 text-xs font-semibold tabular-nums text-gray-700'>
            {selectedOptions.length}
          </span>
        )}
        <ChevronDownIcon
          className={clsx(
            '-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500',
            {
              '!text-gray-400': disabled,
            },
          )}
          aria-hidden='true'
        />
      </Popover.Button>

      <Transition
        as={Fragment}
        enter='transition ease-out duration-100'
        enterFrom='transform opacity-0 scale-95'
        enterTo='transform opacity-100 scale-100'
        leave='transition ease-in duration-75'
        leaveFrom='transform opacity-100 scale-100'
        leaveTo='transform opacity-0 scale-95'
      >
        <Popover.Panel className='absolute right-0 z-10 mt-2 min-w-full origin-top-right max-h-72 overflow-y-auto rounded-md bg-white p-1 shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none'>
          {isLoading && (
            <div className='cursor-wait'>
              <Spinner className='h-6 w-6 m-auto my-1' />
            </div>
          )}

          {!isLoading && (
            <form className='space-y-4 p-3'>
              {options.map((option) => (
                <Checkbox
                  key={option.value}
                  label={option.label}
                  value={option.value}
                  checked={selectedOptions.some(
                    (selectedOption) => selectedOption.value === option.value,
                  )}
                  onChange={(event) => handleSelect(option, event.target.checked)}
                />
              ))}
            </form>
          )}
        </Popover.Panel>
      </Transition>
    </Popover>
  );
};
