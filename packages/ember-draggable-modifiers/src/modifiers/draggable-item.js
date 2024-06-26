import { modifier } from 'ember-modifier';
import { draggable } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import { CLASS, prepareDataForCallback } from './drop-target.js';

/**
 * Modifier to make a DOM element draggable.
 *
 * @param {HTMLElement} element Draggable DOM element.
 * @param {any} options.data Data to associate with the item.
 * @param {String} [options.group] Name of the group this item belongs to.
 * @param {HTMLElement} [options.dragHandleElement] Element that acts as the drag handle.
 * @param {Boolean} [disabled] Prevents the element to be dragged.
 * @param {String} [options.isDraggingClass] Class added to the element when it is being drag.
 * @param {Function} [options.onDragStart] Callback fired when the drag starts.
 * @param {Function} [options.onDragEnd] Callback fired when the item is dropped.
 */
export default modifier(
  function draggableItem(
    element,
    positional,
    {
      data,
      group,
      dragHandleElement,
      disabled = false,
      isDraggingClass = CLASS.DRAGGING,
      onDragStart = () => {},
      onDragEnd = () => {},
    } = {},
  ) {
    return draggable({
      element,
      dragHandle:
        dragHandleElement ??
        element.querySelector('[data-draggable-item-handle]'),
      getInitialData: () => ({ data, group }),
      canDrag: () => !disabled,
      onDragStart: (event) => {
        element.classList.add(isDraggingClass);
        onDragStart(prepareDataForCallback(event));
      },
      onDrop: (event) => {
        element.classList.remove(isDraggingClass);
        onDragEnd(prepareDataForCallback(event));
      },
    });
  },
  { eager: false },
);
