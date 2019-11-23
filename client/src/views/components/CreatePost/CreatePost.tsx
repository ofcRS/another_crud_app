import React, { useState } from 'react'
import { AxiosResponse } from 'axios'

import { submitPost } from 'api/post'
import { Styled } from './CreatePost.styles'
import { Props } from './CreatePost.types'

export const CreatePost: React.FC<Props> = ({
    fetchPosts,
}: Props): JSX.Element => {
    const [title, setTitle] = useState<string>('')
    const [body, setBody] = useState<string>('')

    const clearForm = (): void => {
        setTitle('')
        setBody('')
    }

    const handleSubmit = async (
        event: React.FormEvent<HTMLFormElement>
    ): Promise<void> => {
        event.preventDefault()

        const response: AxiosResponse = await submitPost({
            body,
            title,
        })
        if (response.data.isOk) {
            clearForm()
            fetchPosts()
        }
    }

    return (
        <Styled.CreatePost onSubmit={handleSubmit}>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                }}
            >
                <input value={title} onChange={e => setTitle(e.target.value)} />
                <button type={'submit'}>submit</button>
            </div>
            <textarea
                value={body}
                onChange={e => setBody(e.target.value)}
                style={{
                    width: 300,
                    padding: 0,
                    margin: 0,
                }}
            />
        </Styled.CreatePost>
    )
}
