import clsx from 'clsx';
import { Component, splitProps } from 'solid-js';
import type { JSX } from 'solid-js/jsx-runtime';
import { windi } from '../windi';

type ColorType = 'primary';
type VariantType = 'outlined' | 'contained';
const ColorStyleMap: Record<ColorType, Record<VariantType, string>> = {
  primary: {
    outlined: windi`text-blue-900 border-blue-500 bg-white hover:bg-blue-50`,
    contained: windi`text-white border-blue-500 bg-blue-500 hover:border-blue-400 hover:bg-blue-400`,
  },
};

export const getButtonStyles = (
  color: ColorType,
  variant: VariantType
): string =>
  clsx(
    windi`border p-2 rounded cursor-pointer flex flex-row items-center`,
    ColorStyleMap[color][variant]
  );

interface ButtonProps extends JSX.ButtonHTMLAttributes<HTMLButtonElement> {
  colorType?: ColorType;
  variant?: VariantType;
}
export const Button: Component<ButtonProps> = (props) => {
  const [localProps, restProps] = splitProps(props, [
    'colorType',
    'variant',
    'class',
    'children',
  ]);

  return (
    <button
      class={clsx(
        getButtonStyles(
          localProps.colorType ?? 'primary',
          localProps.variant ?? 'outlined'
        ),
        localProps.class
      )}
      {...restProps}
    >
      {localProps.children}
    </button>
  );
};
