#!/usr/bin/env node

import { fileURLToPath } from "url";
import { insertAt } from "posthtml-insert-at";
import { promises as fs } from "fs";
import { resolve, dirname } from "path";
import btoa from "btoa";
import fetch from "isomorphic-fetch";
import PostHTML from "posthtml";

const __dirname = dirname(fileURLToPath(import.meta.url));
const getFile = (file) => fs.readFile(file, "utf8");
const getURLImportAsBase64 = async (url, name) => {
  const fetchedImport = await (await fetch(url)).text();

  return name
    ? `
      import ${name} from 'data:text/javascript;base64,${btoa(fetchedImport)}';
    `
    : `
      import 'data:text/javascript;base64,${btoa(fetchedImport)}';
    `;
};

const getFileImportAsBase64 = async (path, name) => {
  const fileImport = await getFile(path);

  return name
    ? `
      import ${name} from 'data:text/javascript;base64,${btoa(fileImport)}';
    `
    : `
      import 'data:text/javascript;base64,${btoa(fileImport)}';
    `;
};

const processHtml = async (template) => {
  let postHTMLOptions = [
    insertAt({
      selector: '[type="module"]',
      prepend: await getURLImportAsBase64(
        "https://kherrick.github.io/x-pwgen-components/dist/umd/index.js"
      ),
      behavior: "inside",
    }),
    insertAt({
      selector: '[type="module"]',
      prepend: await getFile(
        `${__dirname}/../../dist/lib/esm/component/XPwgen.js`
      ),
      behavior: "inside",
    }),
    insertAt({
      selector: '[type="module"]',
      prepend: await getFileImportAsBase64(
        `${__dirname}/../../dist/lib/esm/pwgen.js`,
        "pwgen"
      ),
      behavior: "inside",
    }),
  ];

  return (await PostHTML(postHTMLOptions).process(template)).html;
};

// main
(async () => {
  const template = resolve(
    process.cwd(),
    `${__dirname}/../index.template.html`
  );

  const stat = await fs.lstat(template);

  if (!stat.isFile()) {
    throw Error("argument provided is not a file");
  }

  console.log(await processHtml(await getFile(template)));
  process.exit(0);
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
