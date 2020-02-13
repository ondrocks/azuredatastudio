/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the Source EULA. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { CurrentModelsPage } from './currentModelsPage';

import { ModelViewBase } from './modelViewBase';
import * as constants from '../../common/constants';
import { ApiWrapper } from '../../common/apiWrapper';
import { DialogView } from '../dialogView';

/**
 * Dialog to render registered model views
 */
export class RegisteredModelsDialog extends ModelViewBase {

	constructor(
		apiWrapper: ApiWrapper,
		root: string) {
		super(apiWrapper, root);
		this.dialogView = new DialogView(this._apiWrapper);
	}
	public dialogView: DialogView;

	/**
	 * Opens a dialog to manage packages used by notebooks.
	 */
	public open(): Promise<void> {
		return new Promise<void>(resolve => {
			let currentLanguagesTab = new CurrentModelsPage(this._apiWrapper, this);

			let dialog = this.dialogView.createDialog('', [currentLanguagesTab]);

			dialog.okButton.hidden = true;
			dialog.cancelButton.label = constants.extLangDoneButtonText;

			dialog.registerCloseValidator(() => {
				return false; // Blocks Enter key from closing dialog.
			});

			this._apiWrapper.openDialog(dialog);
			resolve();
		});
	}

	/**
	 * Resets the tabs for given provider Id
	 */
	public async refresh(): Promise<void> {
		if (this.dialogView) {
			this.dialogView.refresh();
		}
	}
}