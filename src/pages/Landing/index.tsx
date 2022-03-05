import clsx from 'clsx';
import { Component } from 'solid-js';
import type { JSX } from 'solid-js/jsx-runtime';
import { FileBlankIcon, FolderOpenIcon } from '../../assets/Icons';
import { Button, getButtonStyles } from '../../components/Button';
import { windi } from '../../windi';

interface Props {
  onCreateNew: () => void;
  onLoad: (file: File) => void;
}
export const LandingPage: Component<Props> = (props) => {
  const onLoad: JSX.EventHandlerUnion<HTMLInputElement, Event> = (ev) => {
    const file = ev.currentTarget.files?.item(0);
    if (file) {
      props.onLoad(file);
    }
  };
  const onDropFile: JSX.EventHandlerUnion<HTMLDivElement, DragEvent> = (ev) => {
    ev.preventDefault();
    const file = ev.dataTransfer?.items[0]?.getAsFile();
    if (file) {
      props.onLoad(file);
    }
  };

  return (
    <div
      class="w-full h-full flex flex-col justify-center items-center gap-y-2"
      onDragOver={(ev) => ev.preventDefault()}
      onDrop={onDropFile}
    >
      <h1 class="text-4xl pb-8">GNOME Wallpaper Slideshow Generator</h1>
      <div class="flex flex-row gap-x-4">
        <Button class="gap-x-2" onClick={props.onCreateNew}>
          <FileBlankIcon class="w-6 h-6" />
          <span>Create new config</span>
        </Button>
        <label
          for="load_config"
          class={clsx(getButtonStyles('primary', 'outlined'), windi`gap-x-2`)}
        >
          <FolderOpenIcon class="w-6 h-6" />
          <span>Load existing config file (D&amp;D, or click to select)</span>
        </label>
        <input
          type="file"
          id="load_config"
          class="opacity-0 w-0 h-0"
          onChange={onLoad}
        />
      </div>
    </div>
  );
};
