import { Component } from 'solid-js';
import { DownloadIcon } from '../../../assets/Icons';
import { Button } from '../../../components/Button';

interface Props {
  onExport: () => void;
}
export const BottomToolbar: Component<Props> = (props) => {
  return (
    <div class="w-full flex flex-row justify-center py-2">
      <Button variant="contained" class="gap-x-2 px-8" onClick={props.onExport}>
        <DownloadIcon class="w-6 h-6" />
        <span>Save</span>
      </Button>
    </div>
  );
};
