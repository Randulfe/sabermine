import type { Meta, StoryObj } from "@storybook/react";
import { RegexSelection } from "./RegexSelection";

const meta: Meta<typeof RegexSelection> = {
  title: "RegexSelection",
  component: RegexSelection,
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof RegexSelection>;

export const ViewMode: Story = {
  args: {
    matches: ["test", "regex", "test2", "regex2"],
  },
};

export const EditMode: Story = {
  args: {
    matches: ["test", "regex", "test2", "regex2"],
    approvedMatches: new Set(["test"]),
    onSave: () => undefined,
  },
};

