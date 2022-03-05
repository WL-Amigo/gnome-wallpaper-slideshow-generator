import { WallpaperEntry, WallpaperSettings } from '../WallpaperSettings';

export const exportGnomeWallpapersConfigXml = (
  settings: WallpaperSettings
): void => {
  const root = document.implementation.createDocument('', '', null);
  const backgroundNode = root.createElement('background');
  root.appendChild(backgroundNode);

  backgroundNode.appendChild(createStartTimeNode(root));

  settings.entries.forEach((entry, index) => {
    const nextEntry =
      index === settings.entries.length - 1
        ? settings.entries[0]
        : settings.entries[index + 1];
    if (nextEntry === undefined) {
      return;
    }
    backgroundNode.append(
      createBackgroundStaticNode(root, entry),
      createBackgroundTransitionNode(root, entry, nextEntry)
    );
  });

  const serializedXml = new XMLSerializer().serializeToString(root);
  const anchorEl = document.createElement('a');
  anchorEl.download = 'gnome-wallpaper-slideshow.xml';
  anchorEl.href =
    'data:application/xml:charset=utf-8,' +
    encodeURIComponent(
      '<?xml version="1.0" encoding="utf-8"?>' + serializedXml
    );
  anchorEl.click();
};

const createStartTimeNode = (root: XMLDocument): Element => {
  const startTimeNode = root.createElement('starttime');
  const yearNode = root.createElement('year');
  const monthNode = root.createElement('month');
  const dayNode = root.createElement('day');
  const hourNode = root.createElement('hour');
  const minuteNode = root.createElement('minute');
  const secondNode = root.createElement('second');

  yearNode.innerHTML = '2010';
  monthNode.innerHTML = dayNode.innerHTML = '01';
  hourNode.innerHTML = minuteNode.innerHTML = secondNode.innerHTML = '00';

  startTimeNode.append(
    yearNode,
    monthNode,
    dayNode,
    hourNode,
    minuteNode,
    secondNode
  );

  return startTimeNode;
};

const createBackgroundStaticNode = (
  root: XMLDocument,
  entry: WallpaperEntry
): Element => {
  const staticNode = root.createElement('static');
  const durationNode = root.createElement('duration');
  const fileNode = root.createElement('file');

  durationNode.innerHTML = '3600.0';
  fileNode.innerHTML = entry.basePath + entry.fileName;

  staticNode.append(durationNode, fileNode);

  return staticNode;
};

const createBackgroundTransitionNode = (
  root: XMLDocument,
  entry: WallpaperEntry,
  nextEntry: WallpaperEntry
): Element => {
  const transitionNode = root.createElement('transition');
  const durationNode = root.createElement('duration');
  const fileFromNode = root.createElement('from');
  const fileToNode = root.createElement('to');

  transitionNode.setAttribute('type', 'overlay');
  durationNode.innerHTML = '1.0';
  fileFromNode.innerHTML = entry.basePath + entry.fileName;
  fileToNode.innerHTML = nextEntry.basePath + nextEntry.fileName;

  transitionNode.append(durationNode, fileFromNode, fileToNode);

  return transitionNode;
};
