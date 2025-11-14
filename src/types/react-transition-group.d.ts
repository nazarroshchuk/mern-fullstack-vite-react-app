declare module 'react-transition-group' {
  import { Component, ReactNode, RefObject } from 'react';

  export interface CSSTransitionProps {
    nodeRef?: RefObject<HTMLElement | null>;
    in?: boolean;
    timeout: number;
    classNames: string;
    mountOnEnter?: boolean;
    unmountOnExit?: boolean;
    children: ReactNode;
  }

  export class CSSTransition extends Component<CSSTransitionProps> {}
}
