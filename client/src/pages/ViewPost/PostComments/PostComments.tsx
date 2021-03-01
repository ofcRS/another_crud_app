import React, { useContext, useState } from 'react';

import { Comment } from './Comment';
import { Props } from './PostComments.types';
import { viewPostContext } from '../context';

export const PostComments: React.FC<Props> = ({ commentsTree }) => {
    const [replayingPostId, setReplayingPostId] = useState<null | number>(null);

    const { onLeaveComment, lastAddedCommentId } = useContext(viewPostContext);

    return (
        <div>
            {commentsTree.map(comment => (
                <Comment
                    highlighted={lastAddedCommentId === comment.id}
                    onLeaveComment={(...data) => {
                        onLeaveComment(...data);
                        setReplayingPostId(null);
                    }}
                    key={comment.id}
                    comment={comment}
                    showReplay={replayingPostId === comment.id}
                    onReplay={() => setReplayingPostId(comment.id)}
                />
            ))}
        </div>
    );
};
