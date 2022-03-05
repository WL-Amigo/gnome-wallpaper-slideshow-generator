import clsx from 'clsx';
import { Component } from 'solid-js';
import { windi } from '../../windi';

interface Props {
  value: string;
  onChange: (value: string) => void;
  class?: string;
}
export const TextInput: Component<Props> = (props) => {
  return (
    <input
      type="text"
      class={clsx(windi`border border-gray-500 px-1`, props.class)}
      value={props.value}
      onInput={(e) => props.onChange(e.currentTarget.value)}
    />
  );
};
