import { Component, createSignal, Match, Show, Switch } from 'solid-js';
import { Footer } from './components/Footer';
import { loadGnomeWallpaperXml } from './models/GnomeWallpapersXmlProcessor';
import { WallpaperSettings } from './models/WallpaperSettings';
import { EditPage } from './pages/Edit';
import { LandingPage } from './pages/Landing';

type PageEnum = 'landing' | 'edit';

const App: Component = () => {
  const [currentPage, setCurrentPage] = createSignal<PageEnum>('landing');

  const [loadedWpSettings, setWpSettings] =
    createSignal<WallpaperSettings | null>(null);
  const onCreateNew = () => {
    setWpSettings({ entries: [] });
    setCurrentPage('edit');
  };
  const onLoad = (file: File) => {
    loadGnomeWallpaperXml(file).then((settings) => {
      setWpSettings(settings);
      setCurrentPage('edit');
    });
  };

  return (
    <div class="h-full flex flex-col">
      <div class="flex-1 overflow-hidden container mx-auto">
        <Switch>
          <Match when={currentPage() === 'landing'}>
            <LandingPage onCreateNew={onCreateNew} onLoad={onLoad} />
          </Match>
          <Match when={currentPage() === 'edit'}>
            <Show when={loadedWpSettings()}>
              {(settings) => <EditPage initSettings={settings} />}
            </Show>
          </Match>
        </Switch>
      </div>
      <Footer />
    </div>
  );
};

export default App;
