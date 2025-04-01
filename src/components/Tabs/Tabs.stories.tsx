import type { Meta, StoryObj } from "@storybook/react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./Tabs";
import { fn } from "@storybook/test";

const meta = {
  title: "Tabs",
  component: Tabs,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: (props) => {
    return (
      <Tabs {...props}>
        <TabsList>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          Account settings and preferences
        </TabsContent>
        <TabsContent value="password">
          Change your password here
        </TabsContent>
      </Tabs>
    );
  },
  args: {
    defaultValue: "account",
    onValueChange: fn(),
  },
};
