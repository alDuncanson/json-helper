// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	const alphabetizeJsonCommand: vscode.Disposable = vscode.commands.registerTextEditorCommand(
		'json-helper.alphabetize-json',
		(textEditor: vscode.TextEditor, edit: vscode.TextEditorEdit) => {

			if (vscode.window.activeTextEditor?.document.languageId !== 'json') {
				vscode.window.showErrorMessage('File must be of type *.json');
				return;
			}

			const textDocumentJson = JSON.parse(textEditor.document.getText());
			const alphabetizedEntries = Object.entries(textDocumentJson).sort((firstKey, secondKey) => firstKey[0].toLowerCase() < secondKey[0].toLowerCase() ? -1 : 1);
			const alphabetizedJson = Object.fromEntries(alphabetizedEntries);
			const alphabetizedJsonString = JSON.stringify(alphabetizedJson);

			const firstTextLine = textEditor.document.lineAt(0);
			const lastTextLine = textEditor.document.lineAt(textEditor.document.lineCount - 1);
			const firstToLastRange = new vscode.Range(firstTextLine.range.start, lastTextLine.range.end);

			edit.replace(firstToLastRange, alphabetizedJsonString);
		});

	context.subscriptions.push(alphabetizeJsonCommand);
}

// this method is called when your extension is deactivated
export function deactivate() { }
