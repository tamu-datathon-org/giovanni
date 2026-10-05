/**
 * Tailwind classes for the hacker application's split label/value fields,
 * shared by the generic input, textarea, combobox and multi-select.
 *
 * These render inside the application's `@container`, so the `@[541px]:`
 * breakpoints follow the form's width rather than the viewport: at 540px and
 * below, fields get thinner borders, smaller labels and a fixed 42% label
 * column.
 */

/** FormItem: the field box with its message and description underneath. */
export const FIELD_ITEM = "flex min-w-0 flex-col [align-self:start]";

/** FormItem for stacked (textarea) fields, which stay block layout. */
export const FIELD_ITEM_STACKED = "min-w-0 [align-self:start]";

const FIELD_BOX =
  "grid min-w-0 space-y-2 overflow-hidden rounded-[12px] border-2 border-td-line bg-td-panel focus-within:outline focus-within:outline-[3px] focus-within:outline-offset-[3px] focus-within:outline-td-ink @[541px]:rounded-[18px] @[541px]:border-[3px] [&>*]:m-0 [&>*]:min-w-0";

/** Label beside the control (inputs and dropdowns). */
export const FIELD = `${FIELD_BOX} grid-cols-[minmax(0,42%)_minmax(0,1fr)] @[541px]:grid-cols-[max-content_minmax(0,1fr)]`;

/** Label stacked above the control (textareas). */
export const FIELD_STACKED = `${FIELD_BOX} grid-cols-[minmax(0,1fr)]`;

const LABEL_BASE =
  "flex items-center bg-td-label p-2 text-[14px] font-semibold lowercase leading-[1.25] tracking-[-0.07em] text-td-ink @[541px]:px-[0.85rem] @[541px]:py-[0.65rem] @[541px]:text-[18px]";

export const FIELD_LABEL = `${LABEL_BASE} whitespace-normal border-b-0 border-r-2 border-r-td-line [overflow-wrap:anywhere] @[541px]:whitespace-nowrap @[541px]:border-r-[3px] @[541px]:[overflow-wrap:normal]`;

export const FIELD_LABEL_STACKED = `${LABEL_BASE} whitespace-normal border-b-2 border-r-0 border-b-td-line [overflow-wrap:anywhere] @[541px]:border-b-[3px] @[541px]:[overflow-wrap:normal]`;

/**
 * The control fills its cell. The field box draws the focus ring, so the
 * control suppresses its own (and the page-wide one) with `!`.
 */
const CONTROL_BASE =
  "h-auto w-full rounded-none border-0 border-current bg-white p-2 text-[16px] font-semibold leading-[1.25] tracking-[-0.07em] text-td-navy [box-shadow:none] [font-family:inherit] placeholder:font-normal placeholder:italic placeholder:text-td-muted placeholder:opacity-100 placeholder-shown:bg-[#f0f4f7] focus:![box-shadow:none] focus:![outline:none] disabled:cursor-not-allowed disabled:bg-[#afbec9] disabled:text-[#344f62] disabled:opacity-100 @[541px]:px-[0.85rem] @[541px]:py-[0.6rem]";

/** Single-line inputs and the dropdown trigger buttons. */
export const FIELD_CONTROL = `${CONTROL_BASE} min-h-[44px] @[541px]:min-h-[42px]`;

export const FIELD_TEXTAREA = `${CONTROL_BASE} min-h-[100px] resize-y @[541px]:min-h-[130px]`;

/** Dropdown trigger showing its placeholder ("Select ..."). */
export const FIELD_TRIGGER = `${FIELD_CONTROL} data-[placeholder=true]:bg-[#f0f4f7] data-[placeholder=true]:font-normal data-[placeholder=true]:italic data-[placeholder=true]:text-td-muted`;

/** The "please specify" input that appears under a dropdown's Other option. */
export const FIELD_OTHER_INPUT = `${FIELD_CONTROL} border-t-2 border-t-td-line`;

/** Validation message under a field. */
export const FIELD_MESSAGE = "px-1 text-[12px] leading-[1.4] text-[#a32232]";

/** Small print under a field (descriptions, character counts). */
export const FIELD_NOTE = "px-1 text-[12px] leading-[1.4]";

/**
 * Dropdown popover. It renders in a portal outside the page, so it sets the
 * font itself and reaches into cmdk's parts by their attributes.
 */
export const FIELD_DROPDOWN =
  "max-w-[min(560px,calc(100vw-32px))] overflow-hidden rounded-[12px] border-2 border-td-line bg-td-paper font-kode text-td-ink [&_[cmdk-group]]:bg-td-paper [&_[cmdk-group]]:text-td-ink [&_[cmdk-input]]:text-td-ink [&_[cmdk-input]]:[font-family:inherit] [&_[cmdk-item]]:text-[14px] [&_[cmdk-item]]:[overflow-wrap:anywhere] [&_[cmdk-item][data-selected=true]]:bg-td-label [&_[cmdk-item][data-selected=true]]:text-td-deep [&_[cmdk-root]]:bg-td-paper [&_[cmdk-root]]:text-td-ink";
