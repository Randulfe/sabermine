import type { Meta, StoryObj } from "@storybook/react";
import { RegexItem } from "./RegexItem";
import { useState } from "react";

const meta: Meta<typeof RegexItem> = {
  title: "RegexItem",
  component: RegexItem,
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof RegexItem>;

export const Uncontrolled: Story = {
  args: {
    onDelete: () => undefined,
    onSave: () => undefined,
    onDismiss: () => undefined,
    isEdit: false,
    text: "This is a test text",
  },
};

export const Controlled: Story = {
  render: function ControlledStory(args) {
    const [regex, setRegex] = useState(args.regex);
    return (
      <RegexItem {...args} regex={regex} onSave={(value) => setRegex(value)} />
    );
  },
  args: {
    regex: "test.*regex",
    text: "This is a test text",
  },
};
