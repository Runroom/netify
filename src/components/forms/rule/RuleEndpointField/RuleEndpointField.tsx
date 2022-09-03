import React, {memo, useCallback, useRef} from 'react';
import {useField} from 'formik';
import {TextButton} from '@/components/@common/buttons/TextButton';
import {FieldError} from '@/components/@common/forms/FieldError';
import {TextField} from '@/components/@common/forms/TextField';
import {Dropdown, useDropdownExpansion} from '@/components/@common/misc/Dropdown';
import {FieldRow} from '@/components/forms/common/FieldRow';
import styles from './ruleEndpointField.css';

interface RuleEndpointFieldProps {
	name: string;
}

export const RuleEndpointField = memo<RuleEndpointFieldProps>(({name}) => {
	const [macrosDDExpanded, macrosDDActions] = useDropdownExpansion();

	const [, , {setValue}] = useField(name);

	const endpointFieldRef = useRef<HTMLInputElement>(null);

	const handleMacrosInsert = useCallback(
		(event: React.MouseEvent<HTMLElement>) => {
			const macros = event.currentTarget.dataset.value!;
			const input = endpointFieldRef.current!;

			input.focus();

			const start = input.selectionStart || 0;
			const end = input.selectionEnd || 0;

			const value = input.value.substr(0, start) + macros + input.value.substr(end);

			setValue(value);
		},
		[setValue],
	);

	return (
		<FieldRow title='Endpoint:'>
			<div className={styles.row}>
				<TextField
					ref={endpointFieldRef}
					className={styles.field}
					name={name}
					placeholder='Redirect a request by the new url'
					suffixChildren={
						<Dropdown
							className={styles.macros}
							expanded={macrosDDExpanded}
							target={
								<TextButton
									className={styles.macrosButton}
									tabIndex={-1}
									onClick={macrosDDActions.handleExpansionSwitch}>
									{macrosDDExpanded ? 'close' : 'add macros'}
								</TextButton>
							}
							preferExpansionAlignX='start'
							onCollapse={macrosDDActions.handleCollapse}>
							<div className={styles.macrosPicker}>
								<TextButton
									className={styles.macrosOption}
									data-value='[protocol]'
									onClick={handleMacrosInsert}>
									Protocol
								</TextButton>
								<TextButton
									className={styles.macrosOption}
									data-value='[hostname]'
									onClick={handleMacrosInsert}>
									Hostname
								</TextButton>
								<TextButton
									className={styles.macrosOption}
									data-value='[port]'
									onClick={handleMacrosInsert}>
									Port
								</TextButton>
								<TextButton
									className={styles.macrosOption}
									data-value='[path]'
									onClick={handleMacrosInsert}>
									Path
								</TextButton>
								<TextButton
									className={styles.macrosOption}
									data-value='[query]'
									onClick={handleMacrosInsert}>
									Query
								</TextButton>
							</div>
						</Dropdown>
					}
				/>

				<FieldError name={name} />
			</div>
		</FieldRow>
	);
});

RuleEndpointField.displayName = 'RuleEndpointField';
