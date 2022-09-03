import React, {FC, ReactNode} from 'react';
import cn from 'classnames';
import {WithTooltip} from '../../misc/WithTooltip';
import styles from './iconButton.css';

type NativeButtonProps = React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;

export interface IconButtonProps extends Omit<NativeButtonProps, 'type'> {
	icon: ReactNode;
	tooltip?: string;
}

export const IconButton: FC<IconButtonProps> = (props) => {
	const {className, icon, tooltip, disabled, children, ...nativeProps} = props;

	return (
		<WithTooltip disabled={disabled} tooltip={tooltip}>
			<button {...nativeProps} className={cn(styles.root, className)} type='button' disabled={disabled}>
				<div className={styles.icon}>{icon}</div>
				{children && <div className={styles.title}>{children}</div>}
			</button>
		</WithTooltip>
	);
};

IconButton.displayName = 'IconButton';
