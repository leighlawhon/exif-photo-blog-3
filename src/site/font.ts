import fs from 'fs';
import path from 'path';
import { cwd } from 'process';

const FONT_FAMILY_OPENSANS = 'OpenSans';

const getFontData = async () => {
  let data: ArrayBuffer;
  if (typeof fs !== 'undefined') {
    data = fs.readFileSync(path.join(
      cwd(),
      '/public/fonts/OpenSans-Medium.ttf',
    ));
  } else {
    data = await fetch(new URL(
      '/public/fonts/OpenSans-Medium.ttf',
      import.meta.url
    )).then(res => res.arrayBuffer());
  }
  return data;
};

export const getOpenSansMedium = () => getFontData()
  .then(data => ({
    fontFamily: FONT_FAMILY_OPENSANS,
    fonts: [{
      name: FONT_FAMILY_OPENSANS,
      data,
      weight: 500,
      style: 'normal',
    } as const],
  }));
