/// <reference types="react-scripts" />
import Plug from '@psychedelic/plug-inpage-provider';

declare global {
  interface Window {
    ic?: { plug?: Plug };
  }
}
