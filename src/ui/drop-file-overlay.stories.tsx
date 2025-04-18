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

    // // See https://storybook.js.org/docs/essentials/actions#automatically-matching-args to learn how to setup logging in the Actions panel
    // await userEvent.click(canvas.queryAllByRole('input[type="file"]'));
    // Get all elements with the role 'textbox' and name 'file-input'
    const dndFileInput = canvas.getByTestId<HTMLInputElement>("dnd-file-input");
    await expect(dndFileInput).toBeInTheDocument();

    const dragHint = canvas.getByText(
      /Drag 'n' drop some files here, or click to select files/,
    );

    await expect(dragHint).toBeInTheDocument();
    // Ensure there is at least one file input

    // // Create a mock file
    const file = new File(["hello"], "hello.png", { type: "image/png" });

    // Simulate file selection
    await userEvent.upload(dndFileInput, file);
    // Assert that the file input has the selected file

    await expect(dndFileInput.files).toHaveLength(1);
    await expect(dndFileInput.files?.[0]).toBe(file);
  },
};
