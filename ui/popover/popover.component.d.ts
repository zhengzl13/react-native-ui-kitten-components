/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import React from 'react';
import { Frame, RenderFCProp, Overwrite } from '../../devsupport';
import { ModalProps } from '../modal/modal.component';
import { PopoverViewProps } from './popoverView.component';
declare type PopoverModalProps = Overwrite<ModalProps, {
    children?: React.ReactElement;
}>;
export interface PopoverProps extends PopoverViewProps, PopoverModalProps {
    anchor: RenderFCProp;
    fullWidth?: boolean;
}
export declare type PopoverElement = React.ReactElement<PopoverProps>;
interface State {
    childFrame: Frame;
    anchorFrame: Frame;
    forceMeasure: boolean;
}
/**
 * Displays a content positioned relative to another view.
 *
 * @extends React.Component
 *
 * @method {() => void} show - Sets `content` component visible.
 *
 * @method {() => void} hide - Sets `content` component invisible.
 *
 * @property {boolean} visible - Whether content component is visible.
 * Defaults to false.
 * The property is more specific that the show/hide methods, so do not use them at the same time.
 *
 * @property {() => ReactElement} anchor - A component relative to which content component will be shown.
 *
 * @property {ReactElement} children - A component displayed within the popover.
 *
 * @property {() => void} onBackdropPress - Called when popover is visible and the underlying view was touched.
 * Useful when needed to close the modal on outside touches.
 *
 * @property {boolean} fullWidth - Whether a content component should take the width of `anchor`.
 *
 * @property {string | PopoverPlacement} placement - Position of the content component relative to the `anchor`.
 * Can be `left`, `top`, `right`, `bottom`, `left start`, `left end`, `top start`, `top end`, `right start`,
 * `right end`, `bottom start` or `bottom end`.
 * Defaults to *bottom*.
 *
 * @property {StyleProp<ViewStyle>} backdropStyle - Style of backdrop.
 *
 * @property {ViewProps} ...ViewProps - Any props applied to View component.
 *
 * @overview-example PopoverSimpleUsage
 * Popover accepts it's content as child element and is displayed relative to `anchor` view.
 *
 * @overview-example PopoverPlacement
 * By default, it is displayed to the bottom of `anchor` view, but it is configurable with `placement` property.
 *
 * @overview-example PopoverFullWidth
 * Popover may take the full width of the anchor view by configuring `fullWidth` property.
 *
 * @overview-example PopoverStyledBackdrop
 * To style the underlying view, `backdropStyle` property may be used.
 */
export declare class Popover extends React.Component<PopoverProps, State> {
    static defaultProps: Partial<PopoverProps>;
    state: State;
    private hardwareBackSubscription;
    private modalId;
    private contentPosition;
    private placementService;
    private isPopoverUnmounted;
    private actualPlacement;
    private get preferredPlacement();
    private get contentFlexPosition();
    private get backdropConfig();
    show: () => void;
    hide: () => void;
    private onHardwareBackPress;
    componentDidUpdate(prevProps: PopoverProps): void;
    componentDidMount(): void;
    componentWillUnmount(): void;
    private onChildMeasure;
    private onContentMeasure;
    private findPlacementOptions;
    private renderContentElement;
    private renderPopoverElement;
    private renderMeasuringPopoverElement;
    render(): React.ReactElement;
}
export {};
