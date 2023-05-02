import {
  ActionRow,
  ButtonStyles,
  Component,
  MessageComponentTypes,
  SelectMenuComponent,
  SelectOption,
  TextStyles,
} from "@discordeno/bot";

export const STRING_CONTAINS_SNOWFLAKE_REGEX = /[0-9]{17,19}/


export class Components extends Array<ActionRow> {
  constructor(...args: ActionRow[] | Component[]) {
    super(...(args as ActionRow[]));

    return this;
  }

  addActionRow() {
    // Don't allow more than 5 Action Rows
    if (this.length === 5) return this;

    this.push({
      type: 1,
      components: [] as unknown as ActionRow["components"],
    });
    return this;
  }

  addButton(
    label: string,
    style: keyof typeof ButtonStyles | ButtonStyles,
    customIdOrLink: string,
    options?: { emoji?: string | bigint; disabled?: boolean }
  ) {
    // No Action Row has been created so do it
    if (!this.length) this.addActionRow();

    // Get the last Action Row
    let row = this[this.length - 1]!;

    // If the Action Row already has 5 buttons create a new one
    if (
      row.components.length === 5 ||
      row.components.some(
        (component) => component.type !== MessageComponentTypes.Button
      )
    ) {
      this.addActionRow();
      row = this[this.length - 1]!;

      // Apparently there are already 5 Full Action Rows so don't add the button
      if (row.components.length === 5) return this;
      // Currently only buttons can be in the same Action Row
      if (
        row.components.some(
          (component) => component.type !== MessageComponentTypes.Button
        )
      )
        return this;
    }

    row.components.push({
      type: MessageComponentTypes.Button,
      label: label,
      customId:
        style !== "Link" && style !== ButtonStyles.Link
          ? customIdOrLink
          : undefined,
      style: typeof style === "string" ? ButtonStyles[style] : style,
      emoji: this.stringToEmoji(options?.emoji),
      url:
        style === "Link" || style === ButtonStyles.Link
          ? customIdOrLink
          : undefined,
      disabled: options?.disabled,
    });

    return this;
  }

  addSelectMenu(
    customId: string,
    options?: {
      options?: SelectOption[];
      placeholder?: string;
      minValues?: number;
      maxValues?: number;
      disabled?: boolean;
    }
  ) {
    return new SelectMenuBuilder(this, customId, options);
  }

  __addSelectMenu(selectMenu: SelectMenuComponent) {
    // No Action Row has been created so do it
    if (!this.length) this.addActionRow();

    // Get the last Action Row
    let row = this[this.length - 1]!;

    // If the Action Row already has something create a new one
    if (row.components.length > 0) {
      this.addActionRow();
      row = this[this.length - 1]!;

      // Apparently there are already 5 Full Action Rows so don't add the input text
      if (row.components.length > 0) return this;
    }

    // @ts-ignore fix dd types
    row.components.push(selectMenu);

    return this;
  }

  addInputText(
    label: string,
    customId: string,
    style: TextStyles,
    options: {
      minLength?: number;
      maxLength?: number;
      placeholder?: string;
      required?: boolean;
    }
  ) {
    // No Action Row has been created so do it
    if (!this.length) this.addActionRow();

    // Get the last Action Row
    let row = this[this.length - 1]!;

    // If the Action Row already has something create a new one
    if (row.components.length > 0) {
      this.addActionRow();
      row = this[this.length - 1]!;

      // Apparently there are already 5 Full Action Rows so don't add the input text
      if (row.components.length > 0) return this;
    }

    row.components.push({
      // TODO: check why this is broken
      // @ts-ignore
      type: MessageComponentTypes.InputText,
      label,
      customId,
      // @ts-ignore
      style,
      minLength: options.minLength,
      maxLength: options.maxLength,
      placeholder: options.placeholder,
      required: options.required,
    });

    return row;
  }

  removeLastComponent() {
    // Get the last Action Row
    let row = this[this.length - 1]!;

    row.components.pop();
    return this;
  }

  private stringToEmoji(emoji?: string | bigint) {
    if (!emoji) return;

    emoji = emoji.toString();

    // A snowflake id was provided
    if (STRING_CONTAINS_SNOWFLAKE_REGEX.test(emoji)) {
      return {
        id: BigInt(emoji.match(STRING_CONTAINS_SNOWFLAKE_REGEX)![0]),
      };
    }

    // A unicode emoji was provided
    return {
      name: emoji,
    };
  }
}

class SelectMenuBuilder {
  components: Components;
  customId: string;
  options: SelectOption[];
  placeholder?: string;
  minValues?: number;
  maxValues?: number;
  disabled?: boolean;

  constructor(
    components: Components,
    customId: string,
    options?: {
      options?: SelectOption[];
      placeholder?: string;
      minValues?: number;
      maxValues?: number;
      disabled?: boolean;
    }
  ) {
    this.components = components;
    this.customId = customId;
    this.options = options?.options ?? [];
    this.placeholder = options?.placeholder;
    this.minValues = options?.minValues;
    this.maxValues = options?.maxValues;
    this.disabled = options?.disabled;
  }

  setPlaceholder(placeholder: string) {
    this.placeholder = placeholder;

    return this;
  }

  setMinValues(minValues: number) {
    this.minValues = minValues;

    return this;
  }

  setMaxValues(maxValues: number) {
    this.maxValues = maxValues;

    return this;
  }

  setDisabled(disabled: boolean) {
    this.disabled = disabled;

    return this;
  }

  addOption(
    label: string,
    value: string,
    options?: Pick<SelectOption, "description" | "emoji" | "default">
  ) {
    // DO NOT ADD IF OPTIONS ALREADY FULL
    if (this.options.length >= 25) return this;

    this.options.push({
      label,
      value,
      description: options?.description,
      emoji: options?.emoji,
      // TODO remove when dd fixed
      default: options?.default || false,
    });

    return this;
  }

  ok() {
    this.components.__addSelectMenu({
      ...this,
      type: MessageComponentTypes.SelectMenu,
    });

    return this.components;
  }
}
