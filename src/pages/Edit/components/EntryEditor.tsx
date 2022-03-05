import { Component, Show } from 'solid-js';
import { ImageAddIcon } from '../../../assets/Icons';
import { FileInput, TextInput } from '../../../components/Fields';
import { WallpaperEntry } from '../../../models/WallpaperSettings';

interface Props {
  entry: WallpaperEntry | null;
  onChangeEntry: (patch: Partial<WallpaperEntry>) => void;
  class?: string;
}
export const WallpaperEntryEditor: Component<Props> = (props) => {
  return (
    <div class={props.class}>
      <Show
        when={props.entry}
        fallback={
          <div class="w-full h-full flex justify-center items-center text-gray-500">
            <span>Select entry for edit</span>
          </div>
        }
      >
        {props.entry !== null && (
          <div class="flex flex-col gap-y-4">
            <label>
              <span>Base path: </span>
              <TextInput
                value={props.entry.basePath}
                onChange={(v) => props.onChangeEntry({ basePath: v })}
              />
            </label>
            <label>
              <span>File name: </span>
              <TextInput
                value={props.entry.fileName}
                onChange={(v) => props.onChangeEntry({ fileName: v })}
              />
            </label>
            <FileInput
              id="img_file_input"
              onInputFile={(file) =>
                props.onChangeEntry({ fileName: file.name })
              }
              icon={<ImageAddIcon class="w-12 h-12 text-gray-500" />}
            />
          </div>
        )}
      </Show>
    </div>
  );
};
