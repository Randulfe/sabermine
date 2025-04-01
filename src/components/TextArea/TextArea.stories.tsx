import type { Meta, StoryObj } from "@storybook/react";
import { Textarea } from "./TextArea";
import { fn } from "@storybook/test";

const meta = {
  title: "TextArea",
  component: Textarea,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    onChange: fn(),
    placeholder: "Enter your message here...",
  },
};
