/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the Source EULA. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import * as azdata from 'azdata';
import { ModelViewBase } from './modelViewBase';
import { ApiWrapper } from '../../common/apiWrapper';
import * as constants from '../../common/constants';
import { IPageView, IDataComponent } from '../interfaces';

/**
 * View to pick local models file
 */
export class LocalModelsComponent extends ModelViewBase implements IPageView, IDataComponent<string> {

	private _form: azdata.FormContainer | undefined;
	private _localPath: azdata.InputBoxComponent | undefined;
	private _localBrowse: azdata.ButtonComponent | undefined;

	/**
	 * Creates new view
	 */
	constructor(apiWrapper: ApiWrapper, parent: ModelViewBase) {
		super(apiWrapper, parent.root, parent);
	}

	/**
	 *
	 * @param modelBuilder Register the components
	 */
	public registerComponent(modelBuilder: azdata.ModelBuilder): azdata.Component {
		this._localPath = modelBuilder.inputBox().withProperties({
			value: '',
			width: this.componentMaxLength - this.browseButtonMaxLength - this.spaceBetweenComponentsLength
		}).component();
		this._localBrowse = modelBuilder.button().withProperties({
			label: constants.browseModels,
			width: this.browseButtonMaxLength,
			CSSStyles: {
				'text-align': 'end'
			}
		}).component();
		this._localBrowse.onDidClick(async () => {
			const filePath = await this.getLocalFolderPath();
			if (this._localPath) {
				this._localPath.value = filePath;
			}
		});

		let flexFilePathModel = modelBuilder.flexContainer()
			.withLayout({
				flexFlow: 'row',
				justifyContent: 'space-between'
			}).withItems([
				this._localPath, this._localBrowse]
			).component();

		this._form = modelBuilder.formContainer().withFormItems([{
			title: '',
			component: flexFilePathModel
		}]).component();
		return this._form;
	}

	/**
	 * Returns selected data
	 */
	public get data(): string {
		return this._localPath?.value || '';
	}

	/**
	 * Returns the component
	 */
	public get component(): azdata.Component | undefined {
		return this._form;
	}

	/**
	 * Refreshes the view
	 */
	public async refresh(): Promise<void> {
	}

	/**
	 * Returns the page title
	 */
	public get title(): string {
		return constants.localModelsTitle;
	}
}