import * as vscode from "vscode";
import * as path from "path";
import * as fs from "fs";
import { minify } from "html-minifier-terser";

async function convertHtmlToString(
  filePath: string
): Promise<{ output: string }> {
  const htmlContent = fs.readFileSync(filePath, "utf-8");
  const minified = await minify(htmlContent, {
    collapseWhitespace: true,
    removeComments: false,
    minifyCSS: true,
    minifyJS: true,
  });
  return { output: minified };
}

async function handleConversion(targetFile: string) {
  try {
    const result = await convertHtmlToString(targetFile);
    const inputDir = path.dirname(targetFile);
    const inputName = path.basename(targetFile, path.extname(targetFile));
    const outputPath = path.join(inputDir, `${inputName}.json`);
    fs.writeFileSync(outputPath, JSON.stringify(result, null, 2), "utf-8");
    vscode.window.showInformationMessage(
      `✅ Conversion complete. Output written to ${outputPath}`
    );
  } catch (error: any) {
    vscode.window.showErrorMessage(`Error: ${error.message || error}`);
  }
}

export function activate(context: vscode.ExtensionContext) {
  // Command for active editor
  const convertActiveHtml = vscode.commands.registerCommand(
    "html-to-string-converter.convertActiveHtml",
    async () => {
      const editor = vscode.window.activeTextEditor;
      if (!editor) {
        vscode.window.showWarningMessage("No active editor found.");
        return;
      }
      const filePath = editor.document.fileName;
      if (!filePath.endsWith(".html")) {
        vscode.window.showWarningMessage("Active file is not an HTML file.");
        return;
      }
      await handleConversion(filePath);
    }
  );

  // Command for file explorer/context menu
  const convertSelectedHtml = vscode.commands.registerCommand(
    "html-to-string-converter.convertSelectedHtml",
    async (fileUri: vscode.Uri) => {
      if (!fileUri || !fileUri.fsPath.endsWith(".html")) {
        vscode.window.showWarningMessage("Selected file is not an HTML file.");
        return;
      }
      await handleConversion(fileUri.fsPath);
    }
  );

  context.subscriptions.push(convertActiveHtml, convertSelectedHtml);
}

export function deactivate() {}
