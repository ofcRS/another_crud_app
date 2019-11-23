import React from 'react'

import { Props } from './Post.types'
import { Styled } from './Post.styles'

const Post: React.FC<Props> = ({ data }: Props): JSX.Element => {
    return (
        <Styled.Post>
            <h3>{data.title}</h3>
            <p>{data.body}</p>
        </Styled.Post>
    )
}

export default Post
