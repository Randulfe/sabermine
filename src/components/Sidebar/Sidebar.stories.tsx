import type { Meta, StoryObj } from "@storybook/react";
import { Sidebar } from "./Sidebar";

const meta: Meta<typeof Sidebar> = {
  title: "Sidebar",
  component: Sidebar,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof Sidebar>;

export const Basic: Story = {
  render: () => (
    <div className="flex h-screen">
      <Sidebar>
        <div className="p-4">
          <h2 className="text-lg font-bold mb-4">Navigation</h2>
          <nav className="space-y-2">
            <a href="#" className="block hover:text-primary">Home</a>
            <a href="#" className="block hover:text-primary">Settings</a>
            <a href="#" className="block hover:text-primary">Profile</a>
          </nav>
        </div>
      </Sidebar>
      <main className="flex-1 p-8">
        <h1 className="text-2xl font-bold mb-4">Main Content</h1>
        <p>This is the main content area of the page. The sidebar is visible on the left side.</p>
      </main>
    </div>
  ),
};
