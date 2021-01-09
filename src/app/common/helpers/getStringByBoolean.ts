import { StringBoolean } from '@app/common/enums/stringBoolean';

export const getStringByBoolean = (value: boolean): StringBoolean => (value ? StringBoolean.TRUE : StringBoolean.FALSE);
