import { randomUUID } from 'crypto';
import { HttpStatus } from './constants';

export interface ErrorResponse {
  status: HttpStatus;
  message: string;
}

export interface Book {
  _id: ReturnType<typeof randomUUID>;
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
  descriptions: Description[];
}

export interface Description {
  environment: string;
  action: string;
  characters: string[];
}
