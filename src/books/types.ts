import { randomUUID } from 'crypto';
import { HttpStatus } from './constants';

export interface ErrorResponse {
  status: HttpStatus;
  message: string;
}

export interface Book {
  _id: string;
  title: string;
  chapters: ChapterWrapper[];
}

export interface ChapterWrapper {
  chapter: Chapter;
}

export interface Chapter {
  title: string;
  word_count: string;
  scenes: Scene[];
}

export interface Scene {
  title: string;
  word_count: string;
  panels: Panel[];
}

export interface Panel {
  original_text: string;
  word_count: string;
  environment: string;
  action: string;
  characters: Character[];
}

// export interface BookMeta {
//   _id: string;
//   titleTag: string;
//   chapters: ChapterWrapperMeta[];
// }
// export interface ChapterWrapperMeta {
//   chapter: ChapterMeta;
// }

// export interface ChapterMeta {
//   scenes: SceneMeta[];
// }

// export interface SceneMeta {
//   panels: PanelMeta[];
// }

// export interface PanelMeta {
//   environment: string;
//   action: string;
//   characters: CharacterMeta[];
// }

export interface Character {
  name: string;
  css: string;
  description: string;
}

