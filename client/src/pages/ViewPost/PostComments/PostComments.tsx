import React, { useState } from 'react';

import { Comment } from './Comment';
import { Props } from './PostComments.types';

export const PostComments: React.FC<Props> = ({ commentsTree }) => {
    const [replayingPostId, setReplayingPostId] = useState<null | number>(null);

    return (
        <div>
            {commentsTree.map(comment => (
                <Comment
                    key={comment.id}
                    comment={comment}
                    showReplay={replayingPostId === comment.id}
                    onReplay={() => setReplayingPostId(comment.id)}
                />
            ))}
        </div>
    );
};
