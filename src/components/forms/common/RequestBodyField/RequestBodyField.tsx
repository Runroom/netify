import React, {memo, useMemo} from 'react';
import {RequestBodyType, requestBodyTypesList, responseBodyTypesHumanTitles} from '@/constants/RequestBodyType';
import {KeyValueArrayField} from '@/components/@common/forms/KeyValueArrayField';
import {RadioTabs} from '@/components/@common/forms/RadioTabs';
import {TextareaField} from '@/components/@common/forms/TextareaField';
import {FieldRow} from '../FieldRow';

function typeTitleGetter(type: 'Original' | RequestBodyType) {
	if (type === 'Original') {
		return 'Original';
	}

	return responseBodyTypesHumanTitles[type];
}

interface RequestMethodFieldProps {
	name: string;
	allowOrigin?: boolean;
}

export const RequestBodyField = memo<RequestMethodFieldProps>(({name, allowOrigin}) => {
	const options = useMemo(() => {
		return allowOrigin ? ['Original', ...requestBodyTypesList] : requestBodyTypesList;
	}, [allowOrigin]);

	return (
		<FieldRow title='Body:'>
			<RadioTabs name={`${name}.type`} options={options} optionTitleGetter={typeTitleGetter}>
				{(tabName: string) => {
					switch (tabName) {
						case RequestBodyType.Text:
							return <TextareaField name={`${name}.textValue`} />;

						case RequestBodyType.UrlEncodedForm:
						case RequestBodyType.MultipartFromData:
							return (
								<KeyValueArrayField
									name={`${name}.formValue`}
									keyNameSuffix='key'
									valueNameSuffix='value'
									keyPlaceholder='Key'
									valuePlaceholder='Value'
								/>
							);

						default:
							return null;
					}
				}}
			</RadioTabs>
		</FieldRow>
	);
});

RequestBodyField.displayName = 'RequestBodyField';
