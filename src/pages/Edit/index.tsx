import {
  Component,
  createMemo,
  createSignal,
  For,
  Index,
  Show,
} from 'solid-js';
import {
  WallpaperEntry,
  WallpaperSettings,
} from '../../models/WallpaperSettings';
import type { JSX } from 'solid-js/jsx-runtime';
import clsx from 'clsx';
import { windi } from '../../windi';
import { exportGnomeWallpapersConfigXml } from '../../models/GnomeWallpapersXmlProcessor';
import { Button } from '../../components/Button';
import { WallpaperEntryList } from './components/List';
import { WallpaperEntryEditor } from './components/EntryEditor';
import { BottomToolbar } from './components/BottomToolbar';

interface Props {
  initSettings: WallpaperSettings;
}
export const EditPage: Component<Props> = (props) => {
  const [entries, setEntries] = createSignal(props.initSettings.entries);
  const [currentEditingIndex, setEditingIndex] = createSignal<number | null>(
    null
  );
  const currentEntry = createMemo(() => {
    const currentEntries = entries();
    const index = currentEditingIndex();
    return index === null ? null : currentEntries[index] ?? null;
  });
  const onChangeEntry = (patch: Partial<WallpaperEntry>) => {
    const currentEntries = entries();
    const index = currentEditingIndex();
    if (index === null) {
      return;
    }
    const currentEntry = currentEntries[index];
    if (currentEntry === undefined) {
      return;
    }
    const result = [...currentEntries];
    result.splice(index, 1, {
      ...currentEntry,
      ...patch,
    });

    setEntries(result);
  };

  const onAddNewEntry = () => {
    const currentEntries = entries();
    const lastEntry = currentEntries[currentEntries.length - 1] ?? {
      basePath: '',
      fileName: '',
    };
    setEntries([
      ...currentEntries,
      {
        ...lastEntry,
        fileName: '',
      },
    ]);
    setEditingIndex(currentEntries.length);
  };

  const onDelete = (index: number) => {
    setEntries((prev) => {
      const next = [...prev];
      next.splice(index, 1);
      return next;
    });
  };

  const onExport = () => {
    exportGnomeWallpapersConfigXml({
      entries: entries(),
    });
  };

  return (
    <div class="w-full h-full pt-4 flex flex-col">
      <div class="flex-1 overflow-y-hidden flex flex-row gap-x-4">
        <WallpaperEntryList
          class="flex-1 overflow-auto flex flex-col gap-y-2"
          entries={entries()}
          currentSelectedIndex={currentEditingIndex()}
          onSelect={setEditingIndex}
          onAdd={onAddNewEntry}
          onDelete={onDelete}
        />
        <WallpaperEntryEditor
          class="flex-1 overflow-hidden flex flex-col"
          entry={currentEntry()}
          onChangeEntry={onChangeEntry}
        />
      </div>
      <BottomToolbar onExport={onExport} />
    </div>
  );
};
