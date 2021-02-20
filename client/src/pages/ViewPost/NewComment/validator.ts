import { FormValues } from './NewComment.types';

export const validate = ({ commentText }: FormValues) => {
    if (commentText === '') {
        return {
            commentText: 'requiredField',
        } as const;
    }
};
