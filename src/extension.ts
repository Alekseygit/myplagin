import * as vscode from 'vscode';
import * as fs from 'fs';

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand('extension.copyAndSaveCode', () => {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
      vscode.window.showInformationMessage('No active text editor.');
      return;
    }

    const selection = editor.selection;
    const text = editor.document.getText(selection);
    if (text.trim() === "") {
      vscode.window.showInformationMessage('No text selected.');
      return;
    }

    vscode.window.showSaveDialog({
      filters: {
        'All files': ['*'],
        'Text files': ['txt', 'js', 'py', 'ts', 'cpp']
      }
    }).then(uri => {
      if (uri) {
        try {
          fs.writeFileSync(uri.fsPath, text);
          vscode.window.showInformationMessage('Code saved successfully!');
        } catch (err) {
          vscode.window.showErrorMessage(`Error saving code: ${err}`);
        }
      }
    });
  });

  context.subscriptions.push(disposable);
}

export function deactivate() {}