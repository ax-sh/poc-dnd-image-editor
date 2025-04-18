import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { DropFileOverlay } from "./drop-file-overlay";
import { useCallback, useState } from "react"; // Adjust the import path as needed

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

describe("FileInput Component", () => {
  it("should allow file selection", async () => {
    // Render the component
    const { container } = render(<DropFileWrapper />);

    // Get the file input element using data-testid
    const fileInput = container.querySelector<HTMLInputElement>(
      'input[type="file"]',
    )!;

    // Create a mock file
    const file = new File(["hello"], "hello.png", { type: "image/png" });
    //
    // // Simulate file selection
    await userEvent.upload(fileInput, file);
    //
    // // Assert that the file input has the selected file
    expect(fileInput.files?.[0]).toBe(file);
    expect(fileInput.files).toHaveLength(1);
  });

  // it('should allow multiple file selection', async () => {
  //   // Render the component
  //   render(<FileInput />);
  //
  //   // Get the file input element
  //   const fileInput = screen.getByLabelText(/upload/i); // Adjust the label text as needed
  //
  //   // Create mock files
  //   const file1 = new File(['hello'], 'hello1.png', { type: 'image/png' });
  //   const file2 = new File(['world'], 'hello2.png', { type: 'image/png' });
  //
  //   // Simulate multiple file selection
  //   await userEvent.upload(fileInput, [file1, file2]);
  //
  //   // Assert that the file input has the selected files
  //   expect(fileInput.files).toHaveLength(2);
  //   expect(fileInput.files[0]).toBe(file1);
  //   expect(fileInput.files[1]).toBe(file2);
  // });
});
