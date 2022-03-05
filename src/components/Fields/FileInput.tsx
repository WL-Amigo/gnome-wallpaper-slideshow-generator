import clsx from 'clsx';
import { Component } from 'solid-js';
import type { JSX } from 'solid-js/jsx-runtime';
import { windi } from '../../windi';

interface Props {
  id: string;
  onInputFile: (file: File) => void;
  icon?: JSX.Element;
  class?: string;
}
export const FileInput: Component<Props> = (props) => {
  return (
    <div class="relative group">
      <label
        htmlFor={props.id}
        class={clsx(
          windi`border border-blue-300 rounded flex flex-col items-center gap-y-2 p-4 group-hover:bg-blue-50`,
          props.class
        )}
      >
        {props.icon}
        <span>Drag and drop, or select file</span>
      </label>
      <input
        type="file"
        id={props.id}
        class="opacity-0 absolute inset-0 cursor-pointer"
        onChange={(ev) => {
          const file = ev.currentTarget.files?.item(0);
          file && props.onInputFile(file);
        }}
      />
    </div>
  );
};
