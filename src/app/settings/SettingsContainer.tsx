import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { Settings } from './Settings';
import { SettingsCreators } from '@app/settings/duck/actions';


export type IDispatchProps = ReturnType<typeof mapDispatchToProps>;


const mapDispatchToProps = (dispatch: Dispatch) => ({
	changePassword: (oldPassword: string, newPassword: string, confirmPassword: string) => dispatch(SettingsCreators.changePassword({ oldPassword, newPassword, confirmPassword })),
});

export const SettingsContainer = connect(
	null,
	mapDispatchToProps,
)(Settings);
