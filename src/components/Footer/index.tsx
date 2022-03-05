import clsx from 'clsx';
import { Component } from 'solid-js';
import { GitHubIcon } from '../../assets/Icons';
import { windi } from '../../windi';

const SafeExternalLink: Component<{ href: string; class?: string }> = (
  props
) => (
  <a
    class={clsx(windi`text-blue-900 hover:text-blue-600`, props.class)}
    href={props.href}
    rel="noopener noreferrer"
    target="_blank"
  >
    {props.children}
  </a>
);

export const Footer: Component = () => {
  return (
    <div class="h-12 bg-blue-200 flex flex-row justify-end items-center gap-x-6 px-4">
      <SafeExternalLink
        href="https://github.com/WL-Amigo/gnome-wallpaper-slideshow-generator"
        class="flex flex-row items-center gap-x-1"
      >
        <GitHubIcon class="w-6 h-6" />
        <span>GitHub</span>
      </SafeExternalLink>
      <div class="space-x-1">
        <span>created by</span>
        <SafeExternalLink href="https://github.com/WL-Amigo">
          Amigo
        </SafeExternalLink>
        <span>@</span>
        <SafeExternalLink href="https://white-luck-bringers.netlify.app/">
          WhiteLuckBringers
        </SafeExternalLink>
      </div>
    </div>
  );
};
