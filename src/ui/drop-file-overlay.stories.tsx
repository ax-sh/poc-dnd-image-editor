import type { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, within } from "@storybook/test";
import { DropFileOverlay } from "./drop-file-overlay.tsx";
import { useCallback, useState } from "react";

// https://storybook.js.org/docs/writing-tests/component-testing
function DropFileWrapper() {
  const [files, setFiles] = useState<File[]>([]);

  // Handle file drops
  const handleFileDrop = useCallback((droppedFiles: File[]) => {
    console.debug("Dropped files:", droppedFiles);

    setFiles((prevFiles) => [
      ...prevFiles,
      ...droppedFiles,
    ]);
  }, []);
  return (
    <DropFileOverlay
      onFileDrop={handleFileDrop}
      disableClickOpenFileDialog={!!files.length}
    >
    </DropFileOverlay>
  );
}

const meta: Meta<typeof DropFileWrapper> = {
  component: DropFileWrapper,
  args: {},
};

export default meta;
type Story = StoryObj<typeof DropFileWrapper>;

export const Primary: Story = {
  args: {
    label: "DropFileWrapper",
  },
  parameters: {
    backgrounds: {
      default: "dark",
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    console.log();

    // // 👇 Simulate interactions with the component
    // await userEvent.type(canvas.getByTestId('email'), 'email@provider.com');
    //
    // await userEvent.type(canvas.getByTestId('password'), 'a-random-password');
    //
    // // See https://storybook.js.org/docs/essentials/actions#automatically-matching-args to learn how to setup logging in the Actions panel
    // await userEvent.click(canvas.getByRole('button'));
    //
    // // 👇 Assert DOM structure
    const dragHint = canvas.getByText(
      `Drag 'n' drop some files here, or click to select files`,
    );
    await expect(dragHint).toBeInTheDocument();
  },
};
