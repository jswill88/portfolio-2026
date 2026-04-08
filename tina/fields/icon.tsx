"use client";
import React from "react";
import { Button, TinaField, wrapFieldsWithMeta } from "tinacms";
import { BiChevronRight } from "react-icons/bi";
import { GoCircleSlash } from "react-icons/go";
import { Icon, IconOptions } from "../../components/icon";
import {
  Popover,
  PopoverButton,
  Transition,
  PopoverPanel
} from "@headlessui/react";
import { ColorPickerInput } from "./color";

const parseIconName = (name: string) => {
  const splitName = name.split(/(?=[A-Z])/);
  if (splitName.length > 1) {
    return splitName.slice(1).join(" ");
  } else {
    return name;
  }
};

const getSiblingFieldValue = (form: any, inputName: string, siblingField: string) => {
  const path = inputName.split(".").slice(0, -1).concat(siblingField);
  return path.reduce((acc: any, key) => (acc == null ? undefined : acc[key]), form.getState().values);
};

const BaseIconPickerInput = ({ input }: { input: any }) => {
  const [filter, setFilter] = React.useState("");
  const filteredBlocks = React.useMemo(() => {
    return Object.keys(IconOptions).filter((name) => {
      return name.toLowerCase().includes(filter.toLowerCase());
    });
  }, [filter]);

  const inputLabel = Object.keys(IconOptions).includes(input.value)
    ? parseIconName(input.value)
    : "Select Icon";

  //@ts-ignore
  const InputIcon = IconOptions[input.value] ? IconOptions[input.value] : null;

  return (
    <div className="relative z-1000">
      <input type="text" id={input.name} className="hidden" {...input} />
      <Popover>
        {({ open }) => (
          <>
            <PopoverButton>
              <Button
                className={`text-sm h-11 px-4 ${InputIcon ? "h-11" : "h-10"}`}
                size="custom"
                rounded="full"
                variant={open ? "secondary" : "white"}
              >
                {InputIcon && (
                  <InputIcon className="w-7 mr-1 h-auto fill-current text-blue-500" />
                )}
                {inputLabel}
                {!InputIcon && (
                  <BiChevronRight className="w-5 h-auto fill-current opacity-70 ml-1" />
                )}
              </Button>
            </PopoverButton>
            <div
              className="absolute w-full min-w-48 max-w-2xl -bottom-2 left-0 translate-y-full"
              style={{ zIndex: 1000 }}
            >
              <Transition
                enter="transition duration-150 ease-out"
                enterFrom="transform opacity-0 -translate-y-2"
                enterTo="transform opacity-100 translate-y-0"
                leave="transition duration-75 ease-in"
                leaveFrom="transform opacity-100 translate-y-0"
                leaveTo="transform opacity-0 -translate-y-2"
              >
                <PopoverPanel className="relative overflow-hidden rounded-lg shadow-lg bg-white border border-gray-150 z-50">
                  {({ close }) => (
                    <div className="max-h-96 flex flex-col w-full h-full">
                      <div className="bg-gray-50 p-2 border-b border-gray-100 z-10 shadow-sm">
                        <input
                          type="text"
                          className="bg-white text-sm rounded-sm border border-gray-100 shadow-inner py-1.5 px-2.5 w-full block placeholder-gray-200"
                          onClick={(event: any) => {
                            event.stopPropagation();
                            event.preventDefault();
                          }}
                          value={filter}
                          onChange={(event: any) => {
                            setFilter(event.target.value);
                          }}
                          placeholder="Filter..."
                        />
                      </div>
                      {filteredBlocks.length === 0 && (
                        <span className="relative text-center text-xs px-2 py-3 text-gray-300 bg-gray-50 italic">
                          No matches found
                        </span>
                      )}
                      {filteredBlocks.length > 0 && (
                        <div className="w-full grid grid-cols-6 auto-rows-auto p-2 overflow-y-auto">
                          <button
                            className="relative rounded-lg text-center text-xs py-2 px-3 flex-1 outline-none transition-all ease-out duration-150 hover:text-blue-500 focus:text-blue-500 focus:bg-gray-50 hover:bg-gray-50"
                            key={"clear-input"}
                            onClick={() => {
                              input.onChange("");
                              setFilter("");
                              close();
                            }}
                          >
                            <GoCircleSlash className="w-6 h-auto text-gray-200" />
                          </button>
                          {filteredBlocks.map((name) => {
                            return (
                              <button
                                className="relative flex items-center justify-center rounded-lg text-center text-xs py-2 px-3 flex-1 outline-none transition-all ease-out duration-150 hover:text-blue-500 focus:text-blue-500 focus:bg-gray-50 hover:bg-gray-50"
                                key={name}
                                onClick={() => {
                                  input.onChange(name);
                                  setFilter("");
                                  close();
                                }}
                              >
                                <Icon
                                  data={{
                                    name: name,
                                    size: "custom",
                                    color: "blue",
                                  }}
                                  className="w-7 h-auto"
                                />
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  )}
                </PopoverPanel>
              </Transition>
            </div>
          </>
        )}
      </Popover>
    </div>
  );
};

export const IconPickerInput = wrapFieldsWithMeta(BaseIconPickerInput);

const ConditionalIconPickerField = (props: any) => {
  const source = getSiblingFieldValue(props.form, props.input.name, "source") ?? "library";

  if (source !== "library") {
    return null;
  }

  return <IconPickerInput {...props} />;
};

const ConditionalSvgTextareaField = (props: any) => {
  const source = getSiblingFieldValue(props.form, props.input.name, "source") ?? "library";

  if (source !== "svg") {
    return null;
  }

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">{props.field.label}</label>
      {props.field.description ? (
        <p className="text-xs text-gray-500">{props.field.description}</p>
      ) : null}
      <textarea
        {...props.input}
        rows={8}
        className="block w-full rounded-sm border border-gray-200 bg-white px-3 py-2 font-mono text-sm shadow-inner"
      />
    </div>
  );
};

export const iconSchema = {
  type: "object",
  label: "Icon",
  name: "icon",
  fields: [
    {
      type: "string",
      label: "Source",
      name: "source",
      options: [
        {
          label: "Library Icon",
          value: "library",
        },
        {
          label: "Custom SVG",
          value: "svg",
        },
      ],
    },
    {
      type: "string",
      label: "Icon",
      name: "name",
      ui: {
        component: ConditionalIconPickerField as any,
      },
    },
    {
      type: "string",
      label: "SVG Markup",
      name: "svg",
      description:
        "Paste inline SVG markup here for icons not available in the picker.\nUse currentColor in the SVG if you want the color setting to apply.",
      ui: {
        component: ConditionalSvgTextareaField as any,
      },
    },
    {
      type: "string",
      label: "Color",
      name: "color",
      ui: {
        component: ColorPickerInput as any,
      },
    },
    {
      name: "style",
      label: "Style",
      type: "string",
      options: [
        {
          label: "Circle",
          value: "circle",
        },
        {
          label: "Float",
          value: "float",
        },
      ],
    },
  ],
} satisfies TinaField;
