import * as React from 'react';

import { PaperItem } from './PaperItem';
import Skeleton from '@material-ui/lab/Skeleton';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { IDispatchProps, IStateProps } from '@app/papers/PaperContainer';
import { MenuItem, Theme } from '@material-ui/core';
import { PaperFormContainer } from '@app/common/components/PaperForm/PaperFormContainer';
import TextField from '@material-ui/core/TextField/TextField';
import { Breakpoints } from '@app/common/enums/breakpoints';

const useStyles = makeStyles((theme: Theme) => ({
	root: {
		display: 'flex',
		overflowY: 'scroll',
		margin: '20px 40px',
		flexGrow: 1,
		flexBasis: 'auto',
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'center',
		alignItems: 'center',
	},
	skeleton: {
		marginRight: '20px',
	},
	marginTop: {
		marginTop: theme.spacing(2),
	},
	selector: {
	  width: '320px',
		marginRight: theme.spacing(2),
		marginBottom: theme.spacing(2),
	},
	selectors: {
		display: 'flex',
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'start',
		marginTop: theme.spacing(2),
		[`@media (max-width: ${Breakpoints.MOBILE}px)`]: {
			justifyContent: 'center',
		},
	},
}));

interface ISelectors {
	group: string;
	status: string;
}

export const PaperList: React.FC<IStateProps & IDispatchProps> = ({ role, itemsPapers, status, groupsList, statusesList, getPapersList, getRole, getStatuses, getGroups }) => {
	const classes = useStyles();

	const [values, setValues] = React.useState<ISelectors>({
		group: '',
		status: '',
	});

	const handleChange = (prop: keyof ISelectors) => (e: React.ChangeEvent<HTMLInputElement>) => {
		setValues({ ...values, [prop]: e.target.value });
	};

	React.useEffect(() => {
		getRole();
		getPapersList();
		getStatuses();
		getGroups();
	}, []);

	console.log(values.group, values.status);

	return (
		<div>
      {
      (role === 2 || role === 3) &&
      <div className={classes.selectors}>
        <TextField
          className={classes.selector}
          fullWidth={true}
          variant='outlined'
          required={true}
          select={true}
          name='group'
          label='Sort by group'
          id='group'
          onChange={handleChange('group')}
          value={values.group}
        >
          <MenuItem key={0} value={''}>
            Нет
          </MenuItem>
          {groupsList && groupsList.map((option: { id: number; name: string }) =>
            <MenuItem key={option.id} value={option.id}>
              {option.name}
            </MenuItem>
          )}
        </TextField>
        <TextField
          className={classes.selector}
          fullWidth={true}
          variant='outlined'
          required={true}
          select={true}
          name='status'
          label='Sort by paper status'
          id='status'
          onChange={handleChange('status')}
          value={values.status}
        >
          <MenuItem key={0} value={''}>
            None
          </MenuItem>
          {statusesList && statusesList.map((option: { id: number; name: string }) =>
            <MenuItem key={option.id} value={option.id}>
              {option.name}
            </MenuItem>
          )}
        </TextField>
      </div>
      }

			<div className={classes.root}>

				{
					status === 'SUCCESS' ?
						role === 1 &&
                    <PaperFormContainer/>
						:
						<>
						</>
				}
				{
					(status !== 'SUCCESS' ? Array.from(new Array(10)) : itemsPapers).map((item, index) =>
						<div key={index}>
							{item ?
								<>
									{
										role === 1 && item &&
                      <PaperItem key={item.id}
                      	name="Научный руководитель"
                      	nameField={item.advisory_id}
                      	description={item.description}
                      	theme={item.theme}
                      	id={item.id}
                      />
									}
									{
										(role === 2 || role === 3) &&
                    (
                    (values.group === '' && values.status === '')
                      ||
                    (values.group !== '' && values.group === item.author_id.studyGroup && values.status !== '' && values.status === item.researchStatus_id.id)
                      ||
                    (values.group !== '' && values.group === item.author_id.studyGroup && values.status === '')
                      ||
                    (values.group === '' && values.status !== '' && values.status === item.researchStatus_id.id)
                    )
                    &&
                    <PaperItem key={item.id}
                               name="Научный руководитель"
                               nameField={item.author_id.lastName + ' ' + item.author_id.firstName + ' ' + item.author_id.middleName}
                               description={item.description}
                               theme={item.theme}
                               id={item.id}
                    />
									}
								</>
								:
								<div className={classes.skeleton}>
									<Skeleton variant='text' />
									<Skeleton variant='rect' height={200} width={310}/>
									<Skeleton width="60%"/>
								</div>
							}
						</div>
					)}
			</div>
		</div>
	);
};


