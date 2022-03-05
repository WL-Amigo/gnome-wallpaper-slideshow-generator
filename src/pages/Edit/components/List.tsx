import clsx from 'clsx';
import { Component, For } from 'solid-js';
import { LayerPlusIcon, TrashIcon } from '../../../assets/Icons';
import { Button } from '../../../components/Button';
import { WallpaperEntry } from '../../../models/WallpaperSettings';
import { windi } from '../../../windi';

interface Props {
  entries: readonly WallpaperEntry[];
  currentSelectedIndex: number | null;
  onSelect: (index: number) => void;
  onAdd: () => void;
  onDelete: (index: number) => void;
  class?: string;
}
export const WallpaperEntryList: Component<Props> = (props) => {
  return (
    <div class={props.class}>
      <For each={props.entries}>
        {(item, index) => (
          <ListItem
            entry={item}
            index={index()}
            isSelected={props.currentSelectedIndex === index()}
            onSelect={props.onSelect}
            onDelete={props.onDelete}
          />
        )}
      </For>
      <Button onClick={props.onAdd} class="gap-x-2 justify-center">
        <LayerPlusIcon class="w-6 h-6" />
        <span>Add new entry</span>
      </Button>
    </div>
  );
};

interface ItemProps {
  entry: WallpaperEntry;
  index: number;
  isSelected: boolean;
  onSelect: (index: number) => void;
  onDelete: (index: number) => void;
}
const ListItem: Component<ItemProps> = (props) => {
  return (
    <div
      class={clsx(
        windi`border p-2 rounded cursor-pointer box-border flex flex-row items-center group`,
        props.isSelected ? windi`border-blue-400` : windi`border-gray-200`
      )}
      onClick={() => props.onSelect(props.index)}
    >
      <div class="flex-1">
        <span class="text-gray-500">{props.entry.basePath}</span>
        <span>{props.entry.fileName}</span>
      </div>
      <div class="opacity-25 group-hover:opacity-100">
        <button
          class="text-red-600 hover:text-red-400"
          onClick={(ev) => {
            ev.stopPropagation();
            props.onDelete(props.index);
          }}
        >
          <TrashIcon class="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};
