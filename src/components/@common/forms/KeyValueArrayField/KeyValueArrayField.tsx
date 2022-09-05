import React, {memo} from 'react';
import {FieldArray, getIn} from 'formik';
import {IconButton} from '@/components/@common/buttons/IconButton';
import {FieldError} from '@/components/@common/forms/FieldError';
import {TextField} from '@/components/@common/forms/TextField';
import AddIcon from './icons/add.svg';
import RemoveIcon from './icons/remove.svg';
import styles from './keyValueArrayField.css';

interface KeyValueArrayFieldProps {
	name: string;
	keyNameSuffix: string;
	valueNameSuffix: string;
	keyPlaceholder?: string;
	valuePlaceholder?: string;
	addControlTitle?: string;
	removeControlTitle?: string;
}

export const KeyValueArrayField = memo<KeyValueArrayFieldProps>((props) => {
	const {
		name,
		keyNameSuffix,
		valueNameSuffix,
		keyPlaceholder,
		valuePlaceholder,
		addControlTitle = 'Add new one',
		removeControlTitle = 'Remove item',
	} = props;

	return (
		<ul className={styles.root}>
			<FieldArray
				name={name}
				render={(helpers) => {
					const list = getIn(helpers.form.values, name);
					return list.map((_: any, index: number) => (
						// eslint-disable-next-line react/no-array-index-key
						<li key={index} className={styles.item}>
							<div className={styles.entry}>
								<TextField
									className={styles.field}
									name={`${name}[${index}].${keyNameSuffix}`}
									placeholder={keyPlaceholder}
								/>

								<TextField
									className={styles.field}
									name={`${name}[${index}].${valueNameSuffix}`}
									placeholder={valuePlaceholder}
								/>

								{index === list.length - 1 ? (
									<IconButton
										className={styles.control}
										icon={<AddIcon />}
										tooltip={addControlTitle}
										onClick={() => helpers.push({[keyNameSuffix]: '', [valueNameSuffix]: ''})}
									/>
								) : (
									<IconButton
										className={styles.control}
										icon={<RemoveIcon />}
										tooltip={removeControlTitle}
										onClick={() => helpers.remove(index)}
									/>
								)}
							</div>
							<FieldError name={`${name}[${index}].${keyNameSuffix}`} />
							<FieldError name={`${name}[${index}].${valueNameSuffix}`} />
						</li>
					));
				}}
			/>
		</ul>
	);
});

KeyValueArrayField.displayName = 'KeyValueArrayField';
