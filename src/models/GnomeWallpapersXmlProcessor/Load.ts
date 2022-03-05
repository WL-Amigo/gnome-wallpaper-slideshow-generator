import { WallpaperSettings } from '../WallpaperSettings';

export const loadGnomeWallpaperXml = async (
  configFile: File
): Promise<WallpaperSettings> => {
  const rawXml = await new Promise<string>((res, rej) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        res(reader.result);
      }
    };
    reader.onerror = rej;
    reader.onabort = rej;

    reader.readAsText(configFile);
  });

  const doc = new DOMParser().parseFromString(rawXml, 'application/xml');
  const staticDefs = [...doc.getElementsByTagName('static')].map((staticEl) =>
    parseBackgroundStatic(staticEl)
  );
  const transitionDefs = [...doc.getElementsByTagName('transition')].map(
    (transitionEl) => parseBackgroundTransition(transitionEl)
  );

  return {
    entries: staticDefs.map((sDef) => {
      const lastSlashIndex = sDef.filePath.lastIndexOf('/');
      return {
        basePath: sDef.filePath.slice(0, lastSlashIndex + 1),
        fileName: sDef.filePath.slice(lastSlashIndex + 1),
      };
    }),
  };
};

const parseBackgroundStatic = (
  el: Element
): { duration: number; filePath: string } => {
  if (el.tagName !== 'static') {
    throw new Error('not <static> tag');
  }
  const durationTag = el.getElementsByTagName('duration')[0];
  const fileTag = el.getElementsByTagName('file')[0];
  if (durationTag === undefined || fileTag === undefined) {
    throw new Error(
      'invalid <static> tag (not contains <duration> and <file>)'
    );
  }
  return {
    duration: Number(durationTag.innerHTML),
    filePath: String(fileTag.innerHTML),
  };
};

const parseBackgroundTransition = (
  el: Element
): { duration: number; filePathFrom: string; filePathTo: string } => {
  if (el.tagName !== 'transition') {
    throw new Error('not <transition> tag');
  }
  const durationTag = el.getElementsByTagName('duration')[0];
  const fileFromTag = el.getElementsByTagName('from')[0];
  const fileToTag = el.getElementsByTagName('to')[0];
  if (
    durationTag === undefined ||
    fileFromTag === undefined ||
    fileToTag === undefined
  ) {
    throw new Error(
      'invalid <transition> tag (not contains <duration>, <from>, <to>)'
    );
  }

  return {
    duration: Number(durationTag.innerHTML),
    filePathFrom: String(fileFromTag.innerHTML),
    filePathTo: String(fileToTag),
  };
};
