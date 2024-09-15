import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Developing Csound',
  tagline: 'Workshop for developing Csound',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://kunstmusik.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/developing-csound/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'kunstmusik', // Usually your GitHub org/user name.
  projectName: 'developing-csound', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl:
            'https://github.com/kunstmusik/developing-csound/tree/main/',
          routeBasePath: '/',
          
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
    navbar: {
      title: 'Developing Csound',
      logo: {
        alt: 'My Site Logo',
          src: 'img/android-chrome-192x192.png',
      },
      items: [
        // {
        //   type: 'docSidebar',
        //   sidebarId: 'tutorialSidebar',
        //   position: 'left',
        //   label: 'Tutorial',
        // },
        // {to: '/blog', label: 'Blog', position: 'left'},
        {
          href: 'https://github.com/kunstmusik/developing-csound',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Community',
          items: [
            // {
            //   label: 'Stack Overflow',
            //   href: 'https://stackoverflow.com/questions/tagged/csound',
            // },
            {
              label: 'Discord',
              href: 'https://discord.gg/kp92qyHkjq',
            },
            // {
            //   label: 'Twitter',
            //   href: 'https://twitter.com/kunstmusik',
            // },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/kunstmusik/developing-csound',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Steven Yi. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
